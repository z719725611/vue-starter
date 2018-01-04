/**
 * Created by wangxin on 2017/1/5.
 */
(function (win) {
  function FileProgress(file, setting) {
    this.fileProgressID = file.id;
    this.file = file;
    this.setting = setting;

    this.opacity = 100;
    this.height = 0;

    this.fileProgressWrapper = $('#' + this.fileProgressID);
    if (!this.fileProgressWrapper.length) {
      //创建进度条
      var imgItemBox = this.setting.createProgress(file);
      if(imgItemBox){
        imgItemBox.attr("id", this.fileProgressID);
      }
      this.fileProgressWrapper = $('#' + this.fileProgressID);
    }
  }

  FileProgress.prototype.setProgress = function (loaded, percentage, speed) {
    //处理进度条及文字
    this.setting.setProgress(loaded, percentage, speed, this.fileProgressWrapper);
  };

  FileProgress.prototype.setComplete = function (url, up, res) {
    //处理完成后的dom操作
    this.setting.setComplete(url, up, res, this.fileProgressWrapper);
  };

  FileProgress.prototype.handleError = function (up, err, errTip) {
    //处理错误
    this.setting.handleError(up, err, errTip, this.fileProgressWrapper);
  };
  
  FileProgress.prototype.bindCancelBtnEvent = function (up, file, fileMapper, progressMapper) {
    //绑定取消按钮处理时事件
    var btn = this.setting.getCancelBtn(this.fileProgressWrapper);
    if(btn && btn.length > 0) {
      var self = this;
      if (up) {
        btn.on('click', function(){
          self.handleUploadCancel(up);
          progressMapper.removeByKey(file.id);
          up.removeFile(self.file);
          fileMapper.removeByKey(file.id);
        });
      }
    }
  };

  FileProgress.prototype.handleUploadCancel = function (up) {
    //绑定取消上传处理事件
    this.setting.handleUploadCancel(up, this.fileProgressWrapper);
  };
  
  FileProgress.prototype.reachMaxFileCount = function (up) {
    this.setting.reachMaxFileCount(up, this.fileProgressWrapper);
  };

  win.FileProgress = FileProgress;
})(window);
