const util = require('util')
const gc = require('../config/')
const format_path = require('path')
const bucket = gc.bucket('qreasy-data-folder') // should be your bucket name
const timestamp = Date.now();
const uploadImage = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file

  const blob = bucket.file("Uploadfile_" + timestamp + "_" + originalname.replace(/ /g, "_"))
  const blobStream = blob.createWriteStream({
    resumable: false
  })
  blobStream.on('finish', () => {
    const publicUrl = "https://storage.googleapis.com/"+ bucket.name + "/" + blob.name
    resolve(publicUrl)
  })
  .on('error', (err) => {
    console.log(err)
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
})
module.exports = uploadImage
