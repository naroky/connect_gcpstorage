const Cloud = require('@google-cloud/storage')
const path = require('path')

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: path.join(__dirname, './vostedelista-9d76819fd3d4.json'),
  projectId: 'vostedelista',
})
module.exports = storage