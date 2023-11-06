<template>
  //上传视频
  <el-form-item label="">
    <div>
      <label v-if="progress === 0" class="btn" for="uploadvideo">上传视频</label>
      <input
          id="uploadvideo"
          style="display:none;"
          type="file"
          accept="video/*"
          @change="selectvideo($event)">
    </div>
  </el-form-item>

  <el-dialog :visible.sync="dialogTableVisible" style="text-align: center" :before-close="close">
    <video :src="video" controls="controls" autoplay width="500px" />
  </el-dialog>
  <el-form-item>
    <div class="list-image">
      <div v-for="(item,index) in videolist" :key="index">
        <video class="video" :src="item.data" alt="" />
        <span><i class="el-icon-delete" @click="deletevideo(index)" /><i
            class="el-icon-caret-right"
            style="font-size: 23px;margin-left: 5px;"
            @click="pay(index)"
        /></span>
      </div>
      <el-progress
          v-if="progress"
          type="circle"
          :percentage="progress"
          style="height: 126px; width: 126px;"
          :status="exception"
      />
    </div>
  </el-form-item>

</template>
<script setup lang="ts">

import axios from 'axios'

function selectvideo(e: any) {
    this.exception = '-'
    const file = e.target.files[0] // 获取选中的文件
    if ([
      'video/mp4',
      'video/ogg',
      'video/flv',
      'video/avi',
      'video/wmv',
      'video/rmvb',
      'video/mov'
    ].indexOf(file.type) === -1
    ) {
      // layer.msg('请上传正确的视频格式')
      return false
    }
    if (!file.size) {
      // layer.msg('视频大小不能超过50MB')
      return false
    }
    const reader = new FileReader()
    reader.onload = e => {
      let data
      if (typeof e.target.result === 'object') {
        data = window.URL.createObjectURL(new Blob([e.target.result]))
      } else {
        data = e.target.result
      }
      this.videosrc = data
    }
    // 转化为base64
    reader.readAsDataURL(file)
    const formData = new FormData() // 创建form对象
    formData.append('file', file) // 通过append向form对象添加数据const res = await upLoadImage(formData);
    axios({
      url: this.apiUrl + '/file',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `${this.uploadHeaders.Authorization}` },
      // 原生获取上传进度的事件
      onUploadProgress: progressEvent => {
        const process = ((progressEvent.loaded / progressEvent.total) * 100) | 0
        this.progress = process
      }
    }).then(res => {
      this.$message({ message: `上传${res.data.msg}`, type: 'success' })
      // 进度条变成成功状态
      this.exception = 'success'
      // 延时初始化进度条
      setTimeout(() => {
        this.progress = 0
        // 数据填充 获取本地转化为base64的地址和上传成功地址
        this.videolist.push({ data: this.videosrc, src: this.apiUrl + '/file/getImgStream?idFile=' + res.data.data.realFileName })
      }, 500)
    }).catch(_error => {
      this.$message({ message: `上传失败`, type: 'error' })
      // 进度条变成失败状态
      this.exception = 'exception'
      // 延时初始化进度条
      setTimeout(() => { this.progress = 0 }, 2000)
    })
    //   防止第二次同一个文件不能选中
    e.target.value = ''
  }



</script>
<style lang="scss" scoped>
.post {
  width: 100%;
  height: 100%;
  position: relative;

  .upload-demo {
    height: 360px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    background: rgba(46, 50, 56, 0.05);
    border: 1px dashed rgba(28, 31, 35, 0.08);
    margin-top: 18px;
    .el-icon--upload {
      width: 30px;
      height: 23px;
      margin-bottom: 10px;
    }
    .el-upload__text,
    em {
      margin-top: 14px;
      line-height: 25px;
      font-weight: bold;
      color: rgba(28, 31, 35, 0.8);
      font-size: 14px;
    }
    .el-upload__tip {
      font-size: 12px;
      color: #9b9ea0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  :deep(.el-upload-dragger) {
    border: none;
    background-color: transparent;
  }

  .info--qElns {
    width: 100%;
    display: flex;
    margin-top: 8px;

    .info-item--1S8MG {
      flex: 1;
      background: rgba(46, 50, 56, 0.05);
      border-radius: 4px;
      height: 72px;
      flex-direction: column;
      margin-right: 10px;
      //align-items: left;
      padding: 16px;
      .title--1cW8N {
        font-style: normal;
        font-weight: normal;
        line-height: 20px;
        font-weight: bold;
        font-size: 14px;
        color: rgba(28, 31, 35, 0.9);
        text-align: left !important;
        margin-bottom: 2px;
      }
      .desc--1MyNZ {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 17px;
        color: rgba(28, 31, 35, 0.55);
        color: rgba(28, 31, 35, 0.55);
        text-align: left !important;
      }
    }
  }
}

.post-x {
  display: flex;
  justify-content: center;
  align-items: center;

  .post-c {
    width: 552px;
    margin-top: 60px;

    .title {
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 33px;
      color: rgba(28, 31, 35, 0.9);
      margin-bottom: 16px;
    }

    .textarea {
      width: 100%;
      height: 112px;
      border-radius: 4px;
      background: rgba(46, 50, 56, 0.05);
      border: 1px solid rgba(28, 31, 35, 0.08);
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: rgba(28, 31, 35, 0.9);
      resize: none;

      :deep(.el-textarea__inner) {
        background: transparent;
        border: none;
        height: 112px;
      }
    }
  }
}
.list-image {
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  div,
  .videolist {
    width: 150px;
    height: 150px;
    display: inline-block;
    position: relative;
    margin-right: 30px;
    margin-bottom: 30px;
    border-radius: 6px;
    overflow: hidden;
    transition: opacity 0.3s;
    img,
    video {
      width: 100%;
      height: 100%;
    }
    span {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      i:hover {
        cursor: pointer;
      }
    }
  }
  div:hover span {
    opacity: 1;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  }
}

</style>
