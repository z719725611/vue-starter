/**
 * Created by kevin on 2017/4/6.
 */
(function (win) {
  /**
   * 用于标识需要从CND同步到本地的状态
   */
  var CDN_SYNCSTATE_TOLOCAL = 1;

  // 多附件中文件类型
  var FILE_ATTACHMENT_FILE_TYPE_PIC = 1;// 图片
  var FILE_ATTACHMENT_FILE_TYPE_DOC = 2;// 文件
  var FILE_ATTACHMENT_FILE_TYPE_SOUND = 3;// 声音
  var FILE_ATTACHMENT_FILE_TYPE_WEB = 4;// 网页


  /**
   *
   * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02
   */
  Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      "h+": this.getHours(), // 小时
      "H+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      "S": this.getMilliseconds()
      // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  };


  function UeditorCDNUpload(uploadBtn, cdnUploadToken, communityID, countLimit, ueditor) {
    var cdnSetting = {
      uploadBtn : uploadBtn,
      container : uploadBtn,
      privateURLService : '/file/getPrivateURL.json',
      cdnUploadToken : cdnUploadToken
    };

    var options = {
      countLimit: countLimit,
      exceedCountLimitTips: function (countLimit) {

      },
      mimeType: "image/*"
    };

    this.gateway = cdnUploadToken.cdnGateway;
    this.cdnUpload = new CDNUpload(cdnSetting, options);
    this.communityID = communityID;

    this.ueditor = ueditor;
  }

  UeditorCDNUpload.prototype.init = function () {
    var communityID = this.communityID;
    var ueditor = this.ueditor;
    var gateway = this.gateway;
    this.cdnUpload.init({
      /**
       * 创建进度条DOM
       * @param file 上传的文件对象
       * @returns {*|jQuery|HTMLElement}
       */
      createProgress : function (file) {
        // var container = $('.mReleaseMessage_info_imageBox');
        // var imgBox = container.children('.mReleaseMessage_info_image_bottom');
        // var uploadImgBox = imgBox.children('.mReleaseMessage_info_image_bottom_item_plus');

        // var fileSize = plupload.formatSize(file.size).toUpperCase();
        // var imgItemBox = $($("#imgItemTpl").html().replace("{fileSize}", fileSize));
        // uploadImgBox.before(imgItemBox);
        // mReleaseMessage_info_imageSize(container);
        return null;
      },

      /**
       * 设置上传进度
       * @param loaded 已上传文件大小
       * @param percentage 百分比
       * @param speed 上传速度
       * @param progressBox 进度条DOM，即createProgress创建的DOM
       */
      setProgress : function (loaded, percentage, speed, progressBox) {
        // progressBox.find('.loaded').text(loaded);
        // progressBox.find('.mCommon_basicLoadBar_line').css('width', percentage);
      },

      setComplete : function (url, up, res, progressBox) {
        var file = {
          "fileName" : res.name,
          "fileSize" : res.size,
          "cdnDomainHTTP" : gateway.domainHTTP,
          "cdnDomainHTTPS" : gateway.domainHTTPS,
          "fileType" : res.mime.indexOf("image") != -1 ? 1 : 2,
          "fileSuffix" : Qiniu.getFileExtension(res.name),
          "originalCDNAddr" : url.replace(gateway.domainHTTP, "").replace(gateway.domainHTTPS, "").split("?")[0]
        };

        var options = {
          url: '/file/uploadCdnFileToUserFile.json',
          dataType: 'json',
          type : 'post',
          data: {
            userFileStr: JSON.stringify(file)
          },
          success: function (result) {
            if(result.success == "success"){
              ueditor.focus();
              ueditor.execCommand('inserthtml', '<img  id="' + result.fileID + '" src="' + url +'" title="" style="max-width:100%">');
            }else{
              ueditor.errorHandler(ueditor.getLang('autoupload.loadError'));
            }
          }
        };
        $.ajax(options);
      },

      getCancelBtn : function (progressBox) {
        return progressBox.find('.mReleaseMessage_info_image_bottom_item_del');
      },

      handleUploadCancel : function (up, progressBox) {
        // progressBox.remove();
        $(".mReleaseMessage_info_image_bottom_item_plus").show();
      },

      handleError : function (up, err, errTip, progressBox) {
        ueditor.errorHandler(ueditor.getLang('autoupload.loadError'));
      },
      generateFileName : function (up, file) {
        var uuid = Math.uuidCompact();
        var dateStr = new Date().format("yyyy/MM/dd");
        var ext = Qiniu.getFileExtension(file.name);
        return communityID + "/" + dateStr + "/" + uuid + "." + ext;
      },
      reachMaxFileCount : function (up, progressBox) {
        $(".mReleaseMessage_info_image_bottom_item_plus").hide();
      }
    });
  };

  UeditorCDNUpload.prototype.isUploading = function () {
    return this.cdnUpload.isUploading();
  };

  UeditorCDNUpload.prototype.getGateway = function () {
    return this.gateway;
  };

  UeditorCDNUpload.prototype.getCDNAttList = function () {
    var result = null;
    var resList = this.cdnUpload.getUploadedFileList();
    if(resList && resList.length > 0) {
      result = new Array();
      var len = resList.length;
      for(var i = 0; i < len; i++) {
        var res = resList[i];
        var cdnFile = new Object();
        cdnFile.fileName = res.name;
        cdnFile.fileSize = res.size;
        cdnFile.etag = res.hash;
        cdnFile.path = res.key;
        cdnFile.cdnSync = CDN_SYNCSTATE_TOLOCAL;
        cdnFile.fileType = FILE_ATTACHMENT_FILE_TYPE_PIC;
        cdnFile.order = i;
        result.push(cdnFile);
      }
    }
    return result;
  };
  //暴露服务
  win.UeditorCDNUpload = UeditorCDNUpload;
})(window);
