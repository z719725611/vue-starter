/**
 * Created by wangxin on 2017/1/5.
 */
(function (win) {
  /**
   * CDN提供商——七牛
   * @type {number}
   */
  var CDN_SERVICES_PROVIDER_QINIU = 1;

  /**
   * CDN提供商——阿里云
   * @type {number}
   */
  var CDN_SERVICES_PROVIDER_ALIYUN = 2;

  function CDNUpload(setting, options) {
    options = $.extend({
      maxFileSize: '100mb',
      retries: 0,
      chunkSize: '4mb',
      countLimit: 0,
      nowFileList: [],
      mimeType: "*"
    }, options);

    this.cdnUploadToken = setting.cdnUploadToken;
    this.generateFileName = setting.generateFileName;
    this.privateURLService = setting.privateURLService;
    this.serviceType = setting.serviceType || CDN_SERVICES_PROVIDER_QINIU;
    this.uploadBtn = setting.uploadBtn;
    this.container = setting.container;
    this.maxFileSize = options.maxFileSize;
    this.token = setting.token || setting.cdnUploadToken.token;
    this.domain = setting.domain || setting.cdnUploadToken.cdnGateway.domainHTTPS;
    this.cdnConfigID = setting.cdnConfigID || setting.cdnUploadToken.cdnGateway.cdnID;
    this.retries = options.retries;
    this.chunkSize = options.chunkSize;
    this.countLimit = options.countLimit;
    this.exceedCountLimitTips = options.exceedCountLimitTips;
    this.mimeType = options.mimeType;
    this.capture = options.capture;
    this.nowFileList = options.nowFileList;
    this.uploader = null;
    this.fileMapper = new Map();
    this.progressMapper = new Map();
  }

  CDNUpload.prototype.init = function (setting) {

    if (this.serviceType === CDN_SERVICES_PROVIDER_QINIU) {
      var fileMapper = this.fileMapper;
      var cdnConfigID = this.cdnConfigID;
      var privateURLService = this.privateURLService;
      var countLimit = this.countLimit;
      var progressMapper = this.progressMapper;
      var exceedCountLimitTips = this.exceedCountLimitTips;
      this.uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: this.uploadBtn,
        container: this.container,
        max_file_size: this.maxFileSize,
        chunk_size: this.chunkSize,
        capture: this.capture,
        uptoken: this.token,
        domain: this.domain,
        auto_start: true,
        capture : this.capture,
        filters: {mime_types:this.mimeType},
        multi_selection: mOxie.Env.OS.toLowerCase()==="ios",

        exceedCountLimit : function (selectedFileCount) {
          if(selectedFileCount > countLimit) {
            if(exceedCountLimitTips) {
              exceedCountLimitTips(countLimit);
            }
            return true;
          } else {
            return false;
          }
        },

        init: {
          'FilesAdded': function (up, files) {
            var count = this.files.length;
            plupload.each(files, function (file) {
              var progress = new FileProgress(file, setting);
              progressMapper.put(file.id, progress);
              progress.bindCancelBtnEvent(up, file, fileMapper, progressMapper);
              if(count === countLimit) {
                progress.reachMaxFileCount(up);
              }
            });
          },
          'BeforeUpload': function (up, file) {

          },
          'UploadProgress': function (up, file) {
            // var progress = new FileProgress(file, setting);
            var progress = progressMapper.get(file.id);
            if(progress) {
              progress.setProgress(plupload.formatSize(file.loaded).toUpperCase(), file.percent + "%", file.speed);
            }
          },
          'FileUploaded': function (up, file, info) {
            // var progress = new FileProgress(file, setting);
            var progress = progressMapper.get(file.id);
            if(progress) {
              var domain = up.getOption('domain');
              var res = $.parseJSON(info);
              var url = domain + encodeURI(res.key);

              if (privateURLService) {
                var reqData = {
                  cdnConfigID: cdnConfigID,
                  url: url
                };
                $.ajax({
                  url: privateURLService,
                  dataType: 'json',
                  type: 'post',
                  data: reqData,
                  success: function (data) {
                    progress.setComplete(data.url, up, res);
                  }
                });
              } else {
                progress.setComplete(url, up, res);
              }

              res.name = file.name;
              res.size = file.size;
              res.mime = file.type;
              fileMapper.put(file.id, res);
            }
          },
          'Error': function (up, err, errTip) {
            // var progress = new FileProgress(file, setting);
            try {
                var progress = progressMapper.get(err.file.id);
                progress.handleError(up, err, errTip);
            } catch (e) {
                setting.handleError(up, err, errTip);
            }
          },
          'Key': function (up, file) {
            return setting.generateFileName(up, file);
          }
        }
      });

      // 设置现有文件
      for(var i = 0; i < this.nowFileList.length; i++){
        this.nowFileList[i].status = 5;
      }
      this.uploader.files = this.nowFileList;
    } else {
      console.log("Unsupport this service provider!")
    }
  };
  CDNUpload.prototype.isUploading = function () {
    return this.uploader.total.queued > 0;
  };

  CDNUpload.prototype.getUploadedFileList = function () {
    return this.fileMapper.values();
  };

  /*
   * MAP对象，实现MAP功能
   *
   * 接口：
   * size()     获取MAP元素个数
   * isEmpty()    判断MAP是否为空
   * clear()     删除MAP所有元素
   * put(key, value)   向MAP中增加元素（key, value)
   * remove(key)    删除指定KEY的元素，成功返回True，失败返回False
   * get(key)    获取指定KEY的元素值VALUE，失败返回NULL
   * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
   * containsKey(key)  判断MAP中是否含有指定KEY的元素
   * containsValue(value) 判断MAP中是否含有指定VALUE的元素
   * values()    获取MAP中所有VALUE的数组（ARRAY）
   * keys()     获取MAP中所有KEY的数组（ARRAY）
   *
   * 例子：
   * var map = new Map();
   *
   * map.put("key", "value");
   * var val = map.get("key")
   * ……
   *
   */
  function Map() {
    this.elements = new Array();

    //获取MAP元素个数
    this.size = function() {
      return this.elements.length;
    };

    //判断MAP是否为空
    this.isEmpty = function() {
      return (this.elements.length < 1);
    };

    //删除MAP所有元素
    this.clear = function() {
      this.elements = new Array();
    };

    //向MAP中增加元素（key, value)
    this.put = function(_key, _value) {
      this.elements.push( {
        key : _key,
        value : _value
      });
    };

    //删除指定KEY的元素，成功返回True，失败返回False
    this.removeByKey = function(_key) {
      var bln = false;
      try {
        for (i = 0; i < this.elements.length; i++) {
          if (this.elements[i].key == _key) {
            this.elements.splice(i, 1);
            return true;
          }
        }
      } catch (e) {
        bln = false;
      }
      return bln;
    };

    //删除指定VALUE的元素，成功返回True，失败返回False
    this.removeByValue = function(_value) {//removeByValueAndKey
      var bln = false;
      try {
        for (i = 0; i < this.elements.length; i++) {
          if (this.elements[i].value == _value) {
            this.elements.splice(i, 1);
            return true;
          }
        }
      } catch (e) {
        bln = false;
      }
      return bln;
    };

    //删除指定VALUE的元素，成功返回True，失败返回False
    this.removeByValueAndKey = function(_key,_value) {
      var bln = false;
      try {
        for (i = 0; i < this.elements.length; i++) {
          if (this.elements[i].value == _value && this.elements[i].key == _key) {
            this.elements.splice(i, 1);
            return true;
          }
        }
      } catch (e) {
        bln = false;
      }
      return bln;
    };

    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key) {
      try {
        for (i = 0; i < this.elements.length; i++) {
          if (this.elements[i].key == _key) {
            return this.elements[i].value;
          }
        }
      } catch (e) {
        return false;
      }
      return false;
    };

    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function(_index) {
      if (_index < 0 || _index >= this.elements.length) {
        return null;
      }
      return this.elements[_index];
    };

    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key) {
      var bln = false;
      try {
        for (i = 0; i < this.elements.length; i++) {
          if (this.elements[i].key == _key) {
            bln = true;
          }
        }
      } catch (e) {
        bln = false;
      }
      return bln;
    };

    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value) {
      var bln = false;
      try {
        for (i = 0; i < this.elements.length; i++) {
          if (this.elements[i].value == _value) {
            bln = true;
          }
        }
      } catch (e) {
        bln = false;
      }
      return bln;
    };

    //判断MAP中是否含有指定VALUE的元素
    this.containsObj = function(_key,_value) {
      var bln = false;
      try {
        for (i = 0; i < this.elements.length; i++) {
          if (this.elements[i].value == _value && this.elements[i].key == _key) {
            bln = true;
          }
        }
      } catch (e) {
        bln = false;
      }
      return bln;
    };

    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function() {
      var arr = new Array();
      for (i = 0; i < this.elements.length; i++) {
        arr.push(this.elements[i].value);
      }
      return arr;
    };

    //获取MAP中所有VALUE的数组（ARRAY）
    this.valuesByKey = function(_key) {
      var arr = new Array();
      for (i = 0; i < this.elements.length; i++) {
        if (this.elements[i].key == _key) {
          arr.push(this.elements[i].value);
        }
      }
      return arr;
    };

    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function() {
      var arr = new Array();
      for (i = 0; i < this.elements.length; i++) {
        arr.push(this.elements[i].key);
      }
      return arr;
    };

    //获取key通过value
    this.keysByValue = function(_value) {
      var arr = new Array();
      for (i = 0; i < this.elements.length; i++) {
        if(_value == this.elements[i].value){
          arr.push(this.elements[i].key);
        }
      }
      return arr;
    };

    //获取MAP中所有KEY的数组（ARRAY）
    this.keysRemoveDuplicate = function() {
      var arr = new Array();
      for (i = 0; i < this.elements.length; i++) {
        var flag = true;
        for(var j=0;j<arr.length;j++){
          if(arr[j] == this.elements[i].key){
            flag = false;
            break;
          }
        }
        if(flag){
          arr.push(this.elements[i].key);
        }
      }
      return arr;
    };
  }

  //暴露服务
  win.CDNUpload = CDNUpload;
})(window);
