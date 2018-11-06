const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/secret');

AWS.config.update({
  accessKey: config.aws.accessKey,
  secretAccessKey: config.aws.secretAccessKey,
  region: 'us-east-1'
});

const S3 = new AWS.S3({});
const upload = multer({
  storage: S3,
  bucket: 'footballkik69',
  acl: 'public-read'
});