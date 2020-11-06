const port = 3000;
const FORM = require('./writeform');
const DATA = require('./aws');
const API = require('./api');
const express = require('express');
const app=express();
app.use(express.static('public'));
let o={};
let giohang=[];
// app.get('/',function(req,res){
//     FORM.writeMainForm(res);
//     DATA.getAllItem(res);
// })
app.use('/',API);
// app.get('/new',function(req,res){
//     FORM.writeCreateForm(res);
// })
app.use('/new',API);
// app.get('/add',function(req,res){
//     let MaDienThoai=req.query.MaDienThoai;
//     let MaSo=req.query.MaSo;
//     let TenDienThoai=req.query.TenDienThoai;
//     let Gia=req.query.Gia;
//     let XuatXu=req.query.XuatXu;
//      DATA.createItem(MaSo,MaDienThoai,TenDienThoai,Gia,XuatXu,res);
// })
app.use('/add',API);
app.get('/Chon',function(req,res){
    let MaDienThoai=req.query.MaDienThoai;
    let MaSo=req.query.MaSo;
    let TenDienThoai=req.query.TenDienThoai;
    let Gia=req.query.Gia;
    let SoLuong=req.query.SoLuong;
    var dt={
        MaSo:MaSo,
        MaDienThoai:MaDienThoai,
        TenDienThoai:TenDienThoai,
        SoLuong:Number(SoLuong),
        Gia:Number(Gia)
      };
      o.data = giohang;
      if(o.data.length===0){
        giohang.push(dt);
        o.data = giohang;
      }
      else{
        let trung = false;
        o.data.forEach((dtgh)=>{
            if(dtgh.MaDienThoai===dt.MaDienThoai){
                dtgh.SoLuong+=dt.SoLuong;
                trung=true;
            }
        });
        if(!trung){
            giohang.push(dt);
            o.data = giohang;
          }
      }
      giohang = o.data;
      FORM.writeMainForm(res);
      DATA.getDataWithGioHang(o,res);
})
app.get('/XoaSanPham',function(req,res){
    let MaDienThoai=req.query.MaDienThoai;
    o.data.forEach((dtgh)=>{
        if(dtgh.MaDienThoai===MaDienThoai){
            giohang = giohang.filter(item => item !== dtgh);
        }
    });
    o.data=giohang;
    FORM.writeMainForm(res);
    DATA.getDataWithGioHang(o,res);
})
app.listen(port,function(){
    console.log(`Server starting at port ${port} `);
})
