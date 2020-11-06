const AWS = require('aws-sdk');
const FORM = require('./writeform');
const express = require('express');
const router=express.Router();
AWS.config.update({
    region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId:"", secretAccessKey:""
});

let docClient = new AWS.DynamoDB.DocumentClient();
router.get('/',(req,res)=>{
  FORM.writeMainForm(res);
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
});
router.get('/new',(req,res)=>{
    FORM.writeCreateForm(res);
});
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
router.get('/add',(req,res)=>{
     let MaDienThoai=req.query.MaDienThoai;
    let MaSo=req.query.MaSo;
    let TenDienThoai=req.query.TenDienThoai;
    let Gia=req.query.Gia;
    let XuatXu=req.query.XuatXu;
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
  });
module.exports=router;