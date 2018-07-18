let params = new URLSearchParams()
params.append('fileName', fileName)
let url = '/fileUpload/upload-url'
const postCDNUrl = new Promise((resolve, reject) => {
  this.$http.post(url, params).then(({data}) => {
    if (data.code == 200) {
      let cdnUrl = `${data.url}&expires=9223372036854775807`
      let paramsFile = new FormData()
      paramsFile.append('file', this.files)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }; // 添加请求头  
      resolve(this.$http.put(cdnUrl, paramsFile, config))
      console.log(this.progressData)
    }else {
      reject(data)
    }
  })
})
postCDNUrl.then(res => {
  console.log(res)
  if (res.status == 200) {
    let urlData = res.data
    let imgResUrl = `https://cnbj2.fds.api.xiaomi.com/${urlData.bucketName}/${urlData.objectName}?GalaxyAccessKeyId=${urlData.accessKeyId}&Expires=9223372036854775807&Signature=${urlData.signature}`
    console.log(imgResUrl)
  }
}).catch(rej => {
  console.log(rej)
})
