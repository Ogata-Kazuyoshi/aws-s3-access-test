const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRETKEY,
  region: process.env.AWS_REGION,
});

//認証情報が設定できてるか確認
AWS.config.getCredentials(function (err) {
  if (err) {
    console.log('Error');
  } else {
    console.log('Success');
  }
});

// S3サービスオブジェクトを作成;
// const s3 = new AWS.S3();

// // バケット内のファイル情報を取得するパラメータ
// const params = {
//   Bucket: process.env.AWS_BACKETNAME, // バケット名
//   Key: process.env.AWS_FILENAME, // ファイル名
// };

// // ファイルの情報を取得
// s3.getObject(params, function (err, data) {
//   if (err) {
//     console.log(err, err.stack); // エラーの場合はエラー情報を表示
//   } else {
//     console.log('data : ', data); // 成功した場合はファイルの情報を表示
//   }
// });

// const
//下記がPreSignedUrl
//普通にオブジェクトを取得しても、URLは取得できないので、指定された期間有効な署名付きURLを下記で発行できる
const s3 = new AWS.S3();
const params = {
  Bucket: process.env.AWS_BACKETNAME,
  Key: process.env.AWS_FILENAME,
  Expires: 60 * 5, // 有効期限（秒）
};

const url = s3.getSignedUrl('getObject', params);
console.log('署名付きURL:', url);

// const originalUrl = new URL(
//   'https://tempory-ogata.s3.ap-northeast-1.amazonaws.com/image.png'
// );
// const key = decodeURIComponent(originalUrl.pathname.slice(1)); // Slice removes / in the head.
// console.log('key : ', key);
