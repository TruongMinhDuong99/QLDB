const fs = require('fs');
function writeMainForm(res) {
  let data = fs.readFileSync('mainForm.html', 'utf-8');
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
}
function writeCreateForm(res) {
    let data = fs.readFileSync('createForm.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
  }
function writeItemTable(obj, res){
    res.write(`<table style="border: 1px solid;">
    <tr>
        <th style="border: 1px solid;">Mã số</th>
        <th style="border: 1px solid;">Mã điện thoại</th>
        <th style="border: 1px solid;">Tên điện thoại</th>
        <th style="border: 1px solid;">Giá</th>
        <th style="border: 1px solid;">Xuất xứ</th>
    </tr>`);
    if(obj.err){
      res.write(`<h5 style="background:red;">Không thể kết nối đến CSDL</h5>`)
    }
    else{
      if(obj.data.Items.length===0){
        res.write(`<h5 style="background:red;">Chưa có dữ liệu</h5>`)
      }
      obj.data.Items.forEach((dt)=>{
        res.write(`<tr>
        <td>${dt.MaSo}</td>
        <td>${dt.MaDienThoai}</td>
        <td>${dt.TenDienThoai}</td>
        <td>${dt.Gia}</td>
        <td>${dt.XuatXu}</td>
        <td><input name="SoLuong" type="number" id="${dt.MaDienThoai}" value="1"/></td>
        <td><button onclick="AddCart('${dt.MaDienThoai}', '${dt.MaSo}','${dt.TenDienThoai}', '${dt.Gia}')">Chọn</button></td>
    </tr>`);
      });
      res.write(`</table>`)
    }
  }
  function writeItemTableGioHang(o,obj, res){
    res.write(`<table style="border: 1px solid;">
    <tr>
        <th style="border: 1px solid;">Mã số</th>
        <th style="border: 1px solid;">Mã điện thoại</th>
        <th style="border: 1px solid;">Tên điện thoại</th>
        <th style="border: 1px solid;">Giá</th>
        <th style="border: 1px solid;">Xuất xứ</th>
    </tr>`);
    if(obj.err){
      res.write(`<h5 style="background:red;">Không thể kết nối đến CSDL</h5>`)
    }
    else{
      if(obj.data.Items.length===0){
        res.write(`<h5 style="background:red;">Chưa có dữ liệu</h5>`)
      }
      obj.data.Items.forEach((dt)=>{
        res.write(`<tr>
        <td>${dt.MaSo}</td>
        <td>${dt.MaDienThoai}</td>
        <td>${dt.TenDienThoai}</td>
        <td>${dt.Gia}</td>
        <td>${dt.XuatXu}</td>
        <td><input name="SoLuong" type="number" id="${dt.MaDienThoai}" value="1"/></td>
        <td><button onclick="AddCart('${dt.MaDienThoai}', '${dt.MaSo}','${dt.TenDienThoai}', '${dt.Gia}')">Chọn</button></td>
    </tr>`);
      });
      res.write(`</table>`)
    }
    res.write(`<br/><br/>`)
    res.write(`<h2>Giỏ hàng của bạn</h2>`)
    res.write(`<table style="border: 1px solid;">
    <tr>
        <th style="border: 1px solid;">Mã số</th>
        <th style="border: 1px solid;">Mã điện thoại</th>
        <th style="border: 1px solid;">Tên điện thoại</th>
        <th style="border: 1px solid;">Giá</th>
        <th style="border: 1px solid;">Số lượng</th>
        <th style="border: 1px solid;">Thành tiền</th>
    </tr>`);
    if(o.data.length===0){
        res.write(`<h5 style="background:red;">Chưa có dữ liệu</h5>`)
      }
      o.data.forEach((dt)=>{
        res.write(`<tr>
        <td>${dt.MaSo}</td>
        <td>${dt.MaDienThoai}</td>
        <td>${dt.TenDienThoai}</td>
        <td>${dt.Gia}</td>
        <td>${dt.SoLuong}</td>
        <td>${dt.Gia*dt.SoLuong}</td>
        <td><a href="/XoaSanPham?MaDienThoai=${dt.MaDienThoai}">Xóa</a></td>
    </tr>`);
      });
      res.write(`</table>`)
  }
module.exports={
    writeMainForm:writeMainForm,
    writeItemTable:writeItemTable,
    writeItemTableGioHang:writeItemTableGioHang,
    writeCreateForm:writeCreateForm
}