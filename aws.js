const AWS = require('aws-sdk');
const FORM = require('./writeform');

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId:"", secretAccessKey:""
});

let docClient = new AWS.DynamoDB.DocumentClient();
function getAllItem(res) {
  let params = {
    TableName: "DienThoai"
  };
  let scanObject = {};
  docClient.scan(params, (err, data) => {
    if (err) {
      scanObject.err = err;
    } else {
      scanObject.data = data;
    }
    FORM.writeItemTable(scanObject, res);
  });
}
function getDataWithGioHang(o,res){
    let params = {
        TableName: "DienThoai"
      };
      let scanObject = {};
      docClient.scan(params, (err, data) => {
        if (err) {
          scanObject.err = err;
        } else {
          scanObject.data = data;
        }
        FORM.writeItemTableGioHang(o,scanObject, res);
      });
}
function createItem(MaSo,MaDienThoai,TenDienThoai,Gia,XuatXu,res){
    let params={
      TableName:"DienThoai",
      Item:{
        MaSo:Number(MaSo),
        MaDienThoai:String(MaDienThoai),
        TenDienThoai:String(TenDienThoai),
        Gia:Number(Gia),
        XuatXu:String(XuatXu)
      }
    };
    docClient.put(params,(err,data)=>{
      if(err){
        console.log(err);
        //FORM.writeCreateForm(res);
        //res.write(`<h5>Vui lòng nhập đủ thuộc tính</h5>`)
      }
      else{
        res.redirect('/');
      }
    });
  }
module.exports={
    getAllItem:getAllItem,
    getDataWithGioHang:getDataWithGioHang,
    createItem:createItem
}