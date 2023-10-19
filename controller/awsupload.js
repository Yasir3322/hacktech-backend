const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: "AKIAT5MH3TGHUE6O36UU",
  secretAccessKey: "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",
});

const awsupload = async (req, res) => {
  console.log(req.file);
  const params = {
    Bucket: "trojansquarechatimage",
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  try {
    const s3res = await s3.upload(params).promise();
    console.log(s3res);
    res.status(200).send(s3res);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("file not uploaded");
  }
};

module.exports = awsupload;
