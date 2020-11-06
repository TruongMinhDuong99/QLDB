var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-2",
    accessKeyId:"", secretAccessKey:""
  });

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing users into DynamoDB. Please wait.");

var allUsers = JSON.parse(fs.readFileSync('data.json', 'utf8'));
allUsers.forEach(function(dt) {
    var params = {
        TableName: "DienThoai",
        Item: {
            "MaDienThoai":dt.MaDienThoai,
            "MaSo":dt.MaSo,
            "TenDienThoai":dt.TenDienThoai,
            "Gia":dt.Gia,
            "XuatXu":dt.XuatXu
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add product", dt.TenDienThoai, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", dt.TenDienThoai);
       }
    });
});