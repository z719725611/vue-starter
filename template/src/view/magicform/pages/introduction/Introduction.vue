<template>
  <el-upload
    class="avatar-uploader"
    action="http://up-z1.qiniu.com"
    :data="cdnParams"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        cdnParams: {
          token: 'ycnbFvHAeJHQnmbQ4RwqemHxigXnb94ZpeTqMVjZ:0R7u2tC1I0AMwQh1fbbC0_-YbcE=:eyJpbnNlcnRPbmx5IjowLCJzY29wZSI6ImRqLXRlc3QtdGVtcCIsInJldHVybkJvZHkiOiJ7XCJrZXlcIjpcIiQoa2V5KVwiLFwiZXRhZ1wiOlwiJChldGFnKVwiLFwiYnVja2V0XCI6XCIkKGJ1Y2tldClcIixcImZpbGVTaXplXCI6JChmc2l6ZSksXCJtaW1lVHlwZVwiOlwiJChtaW1lVHlwZSlcIixcImV4dFwiOlwiJChleHQpXCIsXCJmaWxlTmFtZVwiOlwiJChmbmFtZSlcIn0iLCJkZWFkbGluZSI6MTUxNjk4NzIwOX0=',
          key: 'test/cdn/ie9/1.png',
          name: 'hee',
          chunk: 0,
          chunks: 1
        }
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        const host = 'http://ovic7t3w8.bkt.clouddn.com/';
//        this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = host.concat(res.key);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
