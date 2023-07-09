const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const uploadImage = require('./helpers/helpers')
const app = express()
const port = 3000
const multerMid = multer({
storage: multer.memoryStorage(),
limits: {
        fileSize: 5000000,
    },
})

app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
  
app.post('/uploads', async (req, res, next) => {
    try {
        const imageUrl = await uploadImage(req.file)
        res.status(200).json({
            message: "Upload was successful",
            data: imageUrl
          })
      } catch (error) {
        next(error)
      }
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
      error: err,
      message: 'Internal server error!',
    })
    next()
})
app.listen(port, () => {
  console.log('Article : Application for Upload image ')
  console.log('Application is running in port: ',port)
})