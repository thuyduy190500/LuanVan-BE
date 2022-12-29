const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8000;
const nodemailer = require("nodemailer");

const TaiKhoan = require("./models").TaiKhoan;
const THANHPHO = require("./models").THANHPHO;
const QUAN = require("./models").QUAN;
const PHUONG = require("./models").PHUONG;
const DUONG = require("./models").DUONG;
const NHATRO = require("./models").NHATRO;
const DICHVU = require("./models").DICHVU;
const LOAIPHONG = require("./models").LOAIPHONG;
const PHONG = require("./models").PHONG;
const THIETBI = require("./models").THIETBI;
const TTNT = require("./models").TTNT;
const LP_TB = require("./models").LP_TB;
const DV_P = require("./models").DV_P;
const HINHNT = require("./models").HINHNT;
const THANG = require("./models").THANG;
const GIAPHONG = require("./models").GIAPHONG;
const KHACHTHUE = require("./models").KHACHTHUE;
const PHIEUTHU = require("./models").PHIEUTHU;
const TTPHIEUTHU = require("./models").TTPHIEUTHU;
const CHISO_DN = require("./models").CHISO_DN;
const PHIEUDATPHONG = require("./models").PHIEUDATPHONG;

const { Op, where } = require("sequelize");
const { response } = require("express");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server12356788");
});

app.get("/accounts", (req, res) => {
  return TaiKhoan.findAll()
    .then((taikhoan) => res.status(200).send(taikhoan))
    .catch((error) => res.status(400).send(error));
});

app.post("/account-create", (req, res) => {
  return TaiKhoan.create(req.body)
    .then((taikhoan) => res.status(201).send(taikhoan))
    .catch((error) => res.status(400).send(error));
});

app.post("/login", async (req, res) => {
  const tkhoan = await TaiKhoan.findOne({
    where: {
      tendn: req.body.tendn,
      matkhau: req.body.matkhau,
    },
  });
  if (tkhoan) {
    return res.status(200).send(true);
  } else {
    return res.send(false);
  }
});

app.get("/house1", (req, res) => {
  return NHATRO.findAll()
    .then((nt) => res.status(200).send(nt))
    .catch((error) => res.status(400).send(error));
});

// THÀNH PHỐ
app.get("/city", async (req, res) => {
  return THANHPHO.findAll()
    .then((tp) => res.status(200).send(tp))
    .catch((error) => res.status(400).send(error));
});

app.get("/city/:id", (req, res) => {
  return THANHPHO.findByPk(req.params.id)
    .then((dv) => res.status(200).send(dv))
    .catch((error) => res.status(400).send(error));
});

// QUẬN
app.get("/district", (req, res) => {
  return QUAN.findAll()
    .then((q) => res.status(200).send(q))
    .catch((error) => res.status(400).send(error));
});
app.get("/district/:id", (req, res) => {
  return QUAN.findByPk(req.params.id)
    .then((dv) => res.status(200).send(dv))
    .catch((error) => res.status(400).send(error));
});

// PHƯỜNG
app.get("/direction", (req, res) => {
  return PHUONG.findAll()
    .then((p) => res.status(200).send(p))
    .catch((error) => res.status(400).send(error));
});
app.get("/direction/:id", (req, res) => {
  return PHUONG.findByPk(req.params.id)
    .then((dv) => res.status(200).send(dv))
    .catch((error) => res.status(400).send(error));
});

// ĐƯỜNG
app.get("/street", (req, res) => {
  return DUONG.findAll()
    .then((d) => res.status(200).send(d))
    .catch((error) => res.status(400).send(error));
});

app.get("/street/:id", (req, res) => {
  return DUONG.findByPk(req.params.id)
    .then((dv) => res.status(200).send(dv))
    .catch((error) => res.status(400).send(error));
});

app.get("/houses", async (req, res) => {
  const fetchData = await NHATRO.findAll({
    include: [
      {
        model: DUONG,
        include: [
          {
            model: PHUONG,
            include: [{ model: QUAN, include: [THANHPHO] }],
          },
        ],
      },
    ],
  });
  console.log("fetchdata", fetchData);
  const response = await fetchData.map((item) => {
    const tempArr = [
      item.DUONG.TenDuong,
      item.DUONG.PHUONG.TenPhuong,
      item.DUONG.PHUONG.QUAN.TenQuan,
      item.DUONG.PHUONG.QUAN.THANHPHO.TenTP,
    ];
    let diachi = tempArr.join(" - ");
    let tennt = item.TenNT;
    let sdt = item.Sdt;
    let id = item.id;
    return { tennt, diachi, sdt, id };
  });
  return res.send(response);
});

// TỔNG PHÒNG CỦA NHÀ TRỌ
app.get("/tongphong/:NHATROId", async (req, res) => {
  const sophong = await NHATRO.findByPk(req.params.NHATROId, {
    include: [
      {
        model: PHONG,
      },
    ],
  });
  const sp = sophong.PHONGs.length;
  console.log("sp", sp);
  return sp;
});

app.get("/thongtinNT/:id", (req, res) => {
  return TTNT.findByPk(req.params.id)
    .then((ttnt) => res.status(200).send(ttnt))
    .catch((error) => res.status(400).send(error));
});

app.get("/getThongtinNTByNhaTroId/:nhaTroId", (req, res) => {
  console.log("nhatroid", req.params.nhaTroId);
  return TTNT.findOne({ where: { NHATROId: req.params.nhaTroId } })
    .then((ttnt) => res.status(200).send(ttnt))
    .catch((error) => res.status(400).send(error));
});

app.get("/thongtinNT", (req, res) => {
  return TTNT.findAll()
    .then((ttnt) => res.status(200).send(ttnt))
    .catch((error) => res.status(400).send(error));
});

app.post("/create-thongtinNT", async (req, res) => {
  console.log(req.body);
  const nhatro = await NHATRO.create({
    TenNT: req.body.tennhatro,
    Sdt: req.body.sdt,
    MoTa: req.body.mota,
    DUONGId: req.body.duong,
  });
  console.log("max", nhatro);
  const item = {
    DICHVUId: req.body.dichvu,
    LOAIPHONGId: req.body.loaiphong,
    GiaDien: req.body.giadien,
    GiaNuoc: req.body.gianuoc,
    TenNT: req.body.tennhatro,
    Sdt: req.body.sdt,
    MoTa: req.body.mota,
    THANHPHOId: req.body.thanhpho,
    QUANId: req.body.quan,
    PHUONGId: req.body.phuong,
    DUONGId: req.body.duong,
    NHATROId: nhatro.id,
  };
  console.log("max", item);
  return await TTNT.create(item)
    .then((ttnt) => res.status(201).send(ttnt))
    .catch((error) => res.status(400).send(error));
});

app.put("/capnhatThongTinNT/:id", async (req, res) => {
  console.log("req", req.body);
  await TTNT.update(req.body, {
    where: { id: req.params.id },
  });
  const ttntUpdated = await TTNT.findByPk(req.params.id);
  console.log("ttnt", ttntUpdated);
  await NHATRO.update(req.body, {
    where: { id: ttntUpdated.dataValues.NHATROId },
  });
  return res.status(200).send("updated");
});

app.put("/capnhatphong/:id", async (req, res) => {
  console.log("req", req.body, req.params.id);
  const idLP = await PHONG.findByPk(req.params.id);
  console.log("id", idLP);
  await PHONG.update(req.body, {
    where: { id: req.params.id },
  });

  await DV_P.update(req.body, {
    where: { id: req.params.id },
  });
  // await LP_TB.update(req.body, {
  //   where: { LOAIPHONGId: idLP.dataValues.LOAIPHONGId },
  // });
  return res.status(200).send("updated");
});

app.get("/image", async (req, res) => {
  const fetchData = await NHATRO.findAll({
    include: [HINHNT],
  });

  const response = await fetchData.map((item) => {
    let hinh = item;
    let image = item.HINHNTs.TenHinh;

    return { hinh, image };
  });
  return res.send(response);
});

app.get("/house/:id", (req, res) => {
  return NHATRO.findByPk(req.params.id)
    .then((nt) => res.status(200).send(nt))
    .catch((error) => res.status(400).send(error));
});

app.delete("/delete-thongtinNT/:id", async (req, res) => {
  const deleteTTNHATRO = await TTNT.destroy({
    where: { NHATROId: req.params.id },
  });
  const deleteNHATRO = await NHATRO.destroy({ where: { id: req.params.id } });
  return res.send("OK");
});

// DỊCH VỤ
app.get("/service", (req, res) => {
  return DICHVU.findAll()
    .then((service) => res.status(200).send(service))
    .catch((error) => res.status(400).send(error));
});

app.post("/getServiceByName", (req, res) => {
  return DICHVU.findOne({ where: { TenDV: req.body.tenDV } })
    .then((dv) => res.status(200).send(dv))
    .catch((error) => res.status(400).send(error));
});

app.post("/getDeviceByName", (req, res) => {
  return THIETBI.findOne({ where: { TenTB: req.body.tenTB } })
    .then((tb) => res.status(200).send(tb))
    .catch((error) => res.status(400).send(error));
});

app.post("/getTypeRoomByName", (req, res) => {
  console.log("req", req.body);
  return LOAIPHONG.findOne({ where: { LoaiPhong: req.body.LoaiPhong } })
    .then((lp) => res.status(200).send(lp))
    .catch((error) => res.status(400).send(error));
});

app.get("/service/:id", (req, res) => {
  return DICHVU.findByPk(req.params.id)
    .then((dv) => res.status(200).send(dv))
    .catch((error) => res.status(400).send(error));
});

app.post("/create-service", (req, res) => {
  return DICHVU.create(req.body)
    .then((dichvu) => res.status(201).send(dichvu))
    .catch((error) => res.status(400).send(error));
});

app.delete("/delete-service/:id", (req, res) => {
  return DICHVU.destroy({ where: { id: req.params.id } })
    .then(res.status(200).send("deleted"))
    .catch((error) => res.status(400).send(error));
});

app.put("/update-service/:id", (req, res) => {
  return DICHVU.update(req.body, { where: { id: req.params.id } })
    .then(res.status(200).send("updated"))
    .catch((error) => res.status(400).send(error));
});

// GIÁ PHÒNG
app.get("/rateroom", async (req, res) => {
  const fetchData = await GIAPHONG.findAll({
    include: [
      {
        model: LOAIPHONG,
      },
      { model: THANG },
    ],
  });
  const response = await fetchData.map((item) => {
    let GiaPhong = item.GiaPhong;
    let LoaiPhong = item.LOAIPHONG.LoaiPhong;
    let Thang = item.THANG.Thang;
    let TrangThai = item.TrangThai;
    let id = item.id;

    return { GiaPhong, LoaiPhong, Thang, TrangThai, id };
  });
  return res.send(response);
});

app.post("/create-rateroom", async (req, res) => {
  const thang = await THANG.create({
    Thang: req.body.Thang,
  });
  const item = {
    id: req.body.id,
    THANGId: thang.id,
    LOAIPHONGId: req.body.LoaiPhong,
    GiaPhong: req.body.GiaPhong,
    TrangThai: req.body.TrangThai,
  };
  return await GIAPHONG.create(item)
    .then((giaphong) => res.status(201).send(giaphong))
    .catch((error) => res.status(400).send(error));
});

app.put("/update-rateroom/:id", (req, res) => {
  return GIAPHONG.update(req.body, { where: { id: req.params.id } })
    .then(res.status(200).send("updated"))
    .catch((error) => res.status(400).send(error));
});

app.delete("/delete-rateroom/:id", (req, res) => {
  return GIAPHONG.destroy({ where: { id: req.params.id } })
    .then(res.status(200).send("deleted"))
    .catch((error) => res.status(400).send(error));
});

// ĐIỆN NƯỚC
app.get("/electric-water", (req, res) => {
  return THANG.findAll({
    where: {
      [Op.or]: [{ TrangThai: "Đang áp dụng" }, { TrangThai: "Ngừng áp dụng" }],
    },
  })
    .then((service) => res.status(200).send(service))
    .catch((error) => res.status(400).send(error));
});

app.get("/electric-water-state", (req, res) => {
  return THANG.findOne({ where: { TrangThai: "Đang áp dụng" } })
    .then((service) => res.status(200).send(service))
    .catch((error) => res.status(400).send(error));
});

app.post("/create-electric-water", (req, res) => {
  return THANG.create(req.body)
    .then((dichvu) => res.status(201).send(dichvu))
    .catch((error) => res.status(400).send(error));
});

app.put("/update-electric-water/:id", (req, res) => {
  return THANG.update(req.body, { where: { id: req.params.id } })
    .then(res.status(200).send("updated"))
    .catch((error) => res.status(400).send(error));
});

app.delete("/delete-electric-water/:id", (req, res) => {
  return THANG.destroy({ where: { id: req.params.id } })
    .then(res.status(200).send("deleted"))
    .catch((error) => res.status(400).send(error));
});

app.post("/create-motel-room", async (req, res) => {
  const getId = await DUONG.findOne({
    where: {
      TenDuong: req.body.duong,
    },
  });
  const duongId = getId.dataValues.id;
  console.log("duong", duongId);
  const nhatro = await NHATRO.create({
    TenNT: req.body.tennhatro,
    Sdt: req.body.sdt,
    MoTa: req.body.mota,
    DUONGId: duongId,
  });
  return TTNT.create(req.body)
    .then((ttnt) => res.status(201).send(ttnt))
    .catch((error) => res.status(400).send(error));
});

// LOẠI PHÒNG
app.get("/typeroom", (req, res) => {
  return LOAIPHONG.findAll()
    .then((lp) => res.status(200).send(lp))
    .catch((error) => res.status(400).send(error));
});

app.get("/typeroom/:id", (req, res) => {
  return LOAIPHONG.findByPk(req.params.id)
    .then((lp) => res.status(200).send(lp))
    .catch((error) => res.status(400).send(error));
});

app.post("/create-typeroom", async (req, res) => {
  const loaiphong = await LOAIPHONG.create({
    LoaiPhong: req.body.LoaiPhong,
    MoTa: req.body.MoTa,
  });
  console.log("loai phong", loaiphong, loaiphong.dataValues.id);
  const idLoaiPhong = await LOAIPHONG.findByPk(loaiphong.dataValues.id);
  console.log("THUYDUY", idLoaiPhong);
  req.body.ThietBi.map(async (item) => {
    await LP_TB.create({
      THIETBIId: item,
      LOAIPHONGId: loaiphong.dataValues.id,
    });
  });
  return res.status(200).send("created successfully");
});

app.put("/update-typeroom/:id", (req, res) => {
  return LOAIPHONG.update(req.body, { where: { id: req.params.id } })
    .then(res.status(200).send("updated"))
    .catch((error) => res.status(400).send(error));
});

app.delete("/delete-typeroom/:id", (req, res) => {
  return LOAIPHONG.destroy({ where: { id: req.params.id } })
    .then(res.status(200).send("deleted"))
    .catch((error) => res.status(400).send(error));
});

// PHÒNG
app.get("/room", (req, res) => {
  return PHONG.findAll()
    .then((p) => res.status(200).send(p))
    .catch((error) => res.status(400).send(error));
});
// phòng admin
app.get("/room-house/:NHATROId", (req, res) => {
  return PHONG.findAll({ where: { NHATROId: req.params.NHATROId } })
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(400).send(error));
});

app.get("/sldango/:PHONGId", async (req, res) => {
  const sl = await KHACHTHUE.findAll({
    where: { PHONGId: req.params.PHONGId, TrangThai: "Đang ở" },
  });
  const soluong = sl.length;
  console.log("sl", sl.length);
  return res.send({ soluong: soluong });
});

// danh sách phòng theo nhà trọ enduser
app.get("/room-house-typeroom/:NHATROId", async (req, res) => {
  const id = Number(req.params.id);
  const phong = await PHONG.findAll({
    where: { NHATROId: req.params.NHATROId, TrangThai: "Trống" },
    include: [{ model: LOAIPHONG, include: [{ model: GIAPHONG }] }],
  });
  const filterRoom = await phong.filter((item) => item.id === 1);
  console.log("duyyy", filterRoom);

  // const giaphong = [];
  // filterRoom[0].LOAIPHONG.GIAPHONGs.map((e) => {
  //   giaphong.push(e.GiaPhong);
  // });
  // console.log("fil", giaphong);
  const phongArr = [];
  phong.map((a) => {
    let temp = {
      LoaiPhong: a.LOAIPHONG.LoaiPhong,
      DienTich: a.DienTich,
      TenPhong: a.TenPhong,
      id: a.id,
      idLoaiPhong: a.LOAIPHONG.id,
      SLToiDa: a.SLToiDa,
      MoTa: a.MoTa,
      // GiaPhong: giaphong,
    };
    phongArr.push(temp);
  });

  return res.send(phongArr);
});

// danh phòng phòng theo loại phòng enduser
app.post("/getPhongsByNhaTroAndLoaiPhong", async (req, res) => {
  // const id = Number(req.params.id);
  // const phong = await PHONG.findAll({
  //   where: { LOAIPHONGId: req.params.LOAIPHONGId, TrangThai: "Trống" },
  //   include: [{ model: LOAIPHONG, include: [{ model: GIAPHONG }] }],
  // });
  // const filterRoom = await phong.filter((item) => item.id === 1);
  // const phongArr = [];
  // phong.map((a) => {
  //   let temp = {
  //     LoaiPhong: a.LOAIPHONG.LoaiPhong,
  //     DienTich: a.DienTich,
  //     TenPhong: a.TenPhong,
  //     id: a.id,
  //     idLoaiPhong: a.LOAIPHONG.id,
  //     SLToiDa: a.SLToiDa,
  //     MoTa: a.MoTa,
  //     // GiaPhong: giaphong,
  //   };
  //   phongArr.push(temp);
  // });

  // return res.send(phongArr);
  console.log("req", req.body);

  const result = await PHONG.findAll({
    where: {
      NHATROId: req.body.idNhaTro,
      LOAIPHONGId: req.body.idLoaiPhong,
      TrangThai: "Trống",
    },
  });
  return res.status(200).send(result);
});

// chi tiết phòng enduser
app.get("/room-house-typeroom-detail/:id", async (req, res) => {
  const a = await PHONG.findByPk(req.params.id, {
    include: [
      {
        model: LOAIPHONG,
      },
    ],
  });

  const thietbi = await LP_TB.findAll({
    where: { LOAIPHONGId: a.LOAIPHONG.id },
  });
  // console.log("thiet bi", thietbi);

  let arrThietBi = await thietbi.map(async (item) => {
    // console.log("ITEM", item.dataValues.THIETBIId);
    let tenThietBi = await THIETBI.findOne({
      where: { id: item.dataValues.THIETBIId },
    });
    console.log("ten thiet bi", tenThietBi.dataValues.TenTB);

    return tenThietBi.dataValues.TenTB;
  });
  console.log("arr thiet bi", await Promise.all(arrThietBi));

  const giaPhong = await GIAPHONG.findOne({
    where: { LOAIPHONGId: a.LOAIPHONG.id },
  });
  const response = {
    LoaiPhong: a.LOAIPHONG.LoaiPhong,
    DienTich: a.DienTich,
    TenPhong: a.TenPhong,
    id: a.id,
    idLoaiPhong: a.LOAIPHONG.id,
    SLToiDa: a.SLToiDa,
    MoTa: a.MoTa,
    tenThietBi: await Promise.all(arrThietBi),
    giaPhong: giaPhong.dataValues.GiaPhong,
  };

  return res.status(200).send(response);
});

app.get("/room-house-state/:NHATROId", async (req, res) => {
  const phong = await PHONG.findAll(
    // { where: { NHATROId: req.params.NHATROId } },
    { include: [{ model: KHACHTHUE }] }
  );
  return res.send(phong);
});

app.get("/room/:id", async (req, res) => {
  const phong = [
    await PHONG.findByPk(req.params.id, {
      include: [
        { model: NHATRO },
        {
          model: LOAIPHONG,
          include: { model: GIAPHONG },
        },
      ],
    }),
  ];
  const phongArr = [];
  phong.map((a) => {
    let temp = {
      TenPhong: a.TenPhong,
      TenNT: a.NHATRO.TenNT,
      LoaiPhong: a.LOAIPHONG.LoaiPhong,
    };
    phongArr.push(temp);
  });

  return res.status(200).send(phongArr);
});

app.post("/create-room", (req, res) => {
  return PHONG.create(req.body)
    .then((tb) => res.status(201).send(tb))
    .catch((error) => res.status(400).send(error));
});

app.delete("/delete-room/:id", (req, res) => {
  return PHONG.destroy({ where: { id: req.params.id } })
    .then(res.status(200).send("deleted"))
    .catch((error) => res.status(400).send(error));
});

// THIẾT BỊ
app.get("/device", (req, res) => {
  return THIETBI.findAll()
    .then((tb) => res.status(200).send(tb))
    .catch((error) => res.status(400).send(error));
});

app.post("/create-device", (req, res) => {
  return THIETBI.create(req.body)
    .then((tb) => res.status(201).send(tb))
    .catch((error) => res.status(400).send(error));
});

app.delete("/delete-device/:id", (req, res) => {
  return THIETBI.destroy({ where: { id: req.params.id } })
    .then(res.status(200).send("deleted"))
    .catch((error) => res.status(400).send(error));
});

app.put("/update-device/:id", (req, res) => {
  return THIETBI.update(req.body, { where: { id: req.params.id } })
    .then(res.status(200).send("updated"))
    .catch((error) => res.status(400).send(error));
});

app.get("/typeroom-device/:id", async (req, res) => {
  const id = Number(req.params.id);
  const fetchData = await PHONG.findAll({
    include: [
      {
        model: LOAIPHONG,
        include: [
          {
            model: LP_TB,
            include: [{ model: THIETBI }],
          },
          { model: GIAPHONG },
        ],
      },
      { model: NHATRO },
      { model: DV_P, include: [{ model: DICHVU }] },
    ],
  });
  // console.log("id", fetchData);
  const filterRoom = await fetchData.filter((item) => item.id === id);
  const thietbi = [];
  filterRoom[0].LOAIPHONG.LP_TBs.map((e) => {
    thietbi.push(e.THIETBI.TenTB);
  });

  // console.log("filter", filterRoom[0]);
  // let dichvu = [];
  // let dongiadichvu = [];
  let dichvu = await filterRoom[0].DV_Ps.map(async (e) => {
    const arrTenDV = await e.dataValues.DICHVUId.map(async (item) => {
      let dv = await DICHVU.findByPk(item);
      console.log("dongia", dv);
      if (dv !== null) {
        return dv.dataValues.TenDV;
      }
    });
    return await Promise.all(arrTenDV);
  });

  let dongiadichvu = await filterRoom[0].DV_Ps.map(async (e) => {
    const arrDonGia = await e.dataValues.DICHVUId.map(async (item) => {
      let dv = await DICHVU.findByPk(item);
      console.log("dongia", dv);
      if (dv !== null) {
        return dv.dataValues.DonGia;
      }
    });
    return await Promise.all(arrDonGia);
  });
  console.log(
    "dichvukhác",
    await Promise.all(dichvu),
    await Promise.all(dongiadichvu)
  );

  const giaphong = [];
  filterRoom[0].LOAIPHONG.GIAPHONGs.map((e) => {
    giaphong.push(e.GiaPhong);
  });
  console.log("giá", giaphong);

  console.log("room", filterRoom);
  if (filterRoom.length > 0) {
    const detail = {
      TenPhong: filterRoom[0].TenPhong,
      DienTich: filterRoom[0].DienTich,
      TenNT: filterRoom[0].NHATRO.TenNT,
      LoaiPhong: filterRoom[0].LOAIPHONG.LoaiPhong,
      SLToiDa: filterRoom[0].SLToiDa,
      TrangThai: filterRoom[0].TrangThai,
      TenTB: thietbi,
      MoTa: filterRoom[0].MoTa,
      TenDV: await Promise.all(dichvu),
      DonGia: await Promise.all(dongiadichvu),
      GiaPhong: giaphong,
    };

    return res.send([detail]);
  } else return res.send([{}]);
});

// KHÁCH THUÊ
app.get("/customer", async (req, res) => {
  const fetchData = await KHACHTHUE.findAll({
    where: { TrangThai: "Không còn ở" },
    include: [
      {
        model: PHONG,
        include: [{ model: NHATRO }],
      },
    ],
  });
  const response = await fetchData.map((item) => {
    const TenPhong = item.PHONG.TenPhong;
    const TenKT = item.TenKH;
    const id = item.id;

    const NamSinh = item.NamSinh;
    const HoKhau = item.HoKhau;
    const Sdt = item.Sdt;
    const Cmnd = item.cmnd;
    const NgheNghiep = item.NgheNghiep;
    const NgayDen = item.NgayDen;
    const NgayDi = item.NgayDi;
    const TrangThai = item.TrangThai;
    const TenNT = item.PHONG.NHATRO.TenNT;
    const TenNTId = item.PHONG.NHATRO.id;
    const GioiTinh = item.GioiTinh;

    return {
      TenPhong,
      TenKT,
      NamSinh,
      HoKhau,
      Sdt,
      Cmnd,
      NgheNghiep,
      NgayDen,
      NgayDi,
      TrangThai,
      TenNT,
      TenNTId,
      id,
      GioiTinh,
    };
  });
  return res.send(response);
});

app.get("/customer-staying/:NHATROId", async (req, res) => {
  const idNhatro = req.params.NHATROId;
  console.log("id nhaf tro", idNhatro);
  const fetchData = await KHACHTHUE.findAll({
    where: [{ TrangThai: "Đang ở" }],
    include: [
      {
        model: PHONG,
        include: [{ model: NHATRO }],
      },
    ],
  });
  const filterData = fetchData.filter(
    (item) => item.PHONG.NHATROId == idNhatro
  );
  console.log("nhatro", filterData);

  const response = await filterData.map((item) => {
    const TenPhong = item.PHONG.TenPhong;
    const TenKT = item.TenKH;
    const id = item.id;

    const NamSinh = item.NamSinh;
    const HoKhau = item.HoKhau;
    const Sdt = item.Sdt;
    const Cmnd = item.cmnd;
    const NgheNghiep = item.NgheNghiep;
    const NgayDen = item.NgayDen;
    const NgayDi = item.NgayDi;
    const TrangThai = item.TrangThai;
    const TenNT = item.PHONG.NHATRO.TenNT;
    const TenNTId = item.PHONG.NHATRO.id;
    const GioiTinh = item.GioiTinh;

    return {
      TenPhong,
      TenKT,
      NamSinh,
      HoKhau,
      Sdt,
      Cmnd,
      NgheNghiep,
      NgayDen,
      NgayDi,
      TrangThai,
      TenNT,
      TenNTId,
      id,
      GioiTinh,
    };
  });
  return res.send(response);
});

app.get("/customer-detail/:id", async (req, res) => {
  const fetchData = await KHACHTHUE.findByPk(req.params.id, {
    include: [
      {
        model: PHONG,
      },
    ],
  });
  const response = {
    TenPhong: fetchData.PHONG.TenPhong,
    PhongId: fetchData.PHONG.id,
    TenKH: fetchData.TenKH,
    Sdt: fetchData.Sdt,
    NamSinh: fetchData.NamSinh,
    HoKhau: fetchData.HoKhau,
    Cmnd: fetchData.cmnd,
    NgheNghiep: fetchData.NgheNghiep,
    NgayDen: fetchData.NgayDen,
    NgayDi: fetchData.NgayDi,
    id: fetchData.id,
    GioiTinh: fetchData.GioiTinh,
  };
  return res.status(200).send(response);
});

app.post("/create-customer", async (req, res) => {
  const addp = await KHACHTHUE.create(req.body);
  return PHONG.update(
    { TrangThai: "Có người ở" },
    { where: { id: addp.PHONGId } }
  )
    .then(res.status(201).send("updated"))
    .catch((error) => res.status(400).send(error));
});

app.get("/customer/:PHONGId", async (req, res) => {
  const khachthue = await KHACHTHUE.findAll({
    where: { PHONGId: req.params.PHONGId, TrangThai: "Đang ở" },
  });
  const response = await khachthue.map((kt) => {
    const TenKT = kt.TenKH;
    const NamSinh = kt.NamSinh;
    const HoKhau = kt.HoKhau;
    const Sdt = kt.Sdt;
    const Cmnd = kt.cmnd;
    const NgheNghiep = kt.NgheNghiep;
    const NgayDen = kt.NgayDen;
    const NgayDi = kt.NgayDi;
    const TrangThai = kt.TrangThai;
    const GioiTinh = kt.GioiTinh;
    const DaiDienPhong = kt.DaiDienPhong;

    const idKhach = kt.id;
    const idPhong = kt.PHONGId;

    return {
      TenKT,
      NamSinh,
      HoKhau,
      Sdt,
      GioiTinh,
      Cmnd,
      NgheNghiep,
      NgayDen,
      NgayDi,
      TrangThai,
      DaiDienPhong,
      idKhach,
      idPhong,
    };
  });
  return res.send(response);
});

app.post("/traphong", async (req, res) => {
  const idKhach = req.body.idKhach;
  const idPhong = req.body.idPhong;
  const updateTrangThaiKhach = await KHACHTHUE.update(
    {
      TrangThai: "Không còn ở",
    },
    { where: { id: idKhach } }
  );
  //   const bao = KHACHTHUE.findByPk(req.params.id,{})
  console.log("2 id", req.body?.idKhach, req.body?.idPhong);
  const isRoomEmpty = await KHACHTHUE.findAll({
    where: {
      [Op.not]: [{ id: idKhach }],
      PHONGId: idPhong,
      TrangThai: "Đang ở",
    },
  });
  if (isRoomEmpty.length === 0) {
    const updateTrangThaiPhong = await PHONG.update(
      {
        TrangThai: "Trống",
      },
      { where: { id: idPhong } }
    );
  }
  return res.status(200).send("success");
});

app.put("/update-customer/:id", (req, res) => {
  return KHACHTHUE.update(req.body, { where: { id: req.params.id } })
    .then(res.status(200).send("updated"))
    .catch((error) => res.status(400).send(error));
});

app.delete("/delete-customer/:id", (req, res) => {
  return KHACHTHUE.destroy({ where: { id: req.params.id } })
    .then(res.status(200).send("deleted"))
    .catch((error) => res.status(400).send(error));
});

// nháp

app.get("/phong/:NHATROId", async (req, res) => {
  const id = Number(req.params.NHATROId);
  const fetchData = await PHONG.findAll({
    where: { NHATROId: req.params.NHATROId },
    include: [
      {
        model: LOAIPHONG,
        include: [
          {
            model: GIAPHONG,
          },
        ],
      },
      { model: NHATRO },
    ],
  });
  console.log("id", fetchData);
  const filterRoom = await fetchData.filter((item) => item.id === id);
  console.log("filter", filterRoom);
  // const giaphong = [];
  // filterRoom[0].LOAIPHONG.GIAPHONGs.map((e) => {
  //   giaphong.push(e.GiaPhong);
  // });
  // if (filterRoom.length > 0) {
  //   const detail = {
  //     TenPhong: filterRoom[0].TenPhong,
  //     LoaiPhong: filterRoom[0].LOAIPHONG.LoaiPhong,
  //     TenNT: filterRoom[0].NHATRO.TenNT,
  //     GiaPhong: giaphong,
  //   };

  //   return res.send([detail]);
  // } else return res.send([{}]);
});

// HÓA ĐƠN
app.get("/bill-house/:NHATROId", async (req, res) => {
  const fetchDataPhieuThu = await TTPHIEUTHU.findAll({
    where: { NHATROId: req.params.NHATROId, TrangThai: "Chưa thu" },
    include: [
      {
        model: PHONG,
        include: { model: NHATRO },
      },
      { model: THANG },
    ],
  });

  console.log("cs", fetchDataPhieuThu);

  const response = await fetchDataPhieuThu.map((item) => {
    let NgayLap = item.NgayLap;
    let TenPhong = item.PHONG.TenPhong;
    let Thang = item.THANG.Thang;
    let TenNT = item.PHONG.NHATRO.TenNT;
    let TongTien = item.TongTien;
    let id = item.id;
    let TrangThai = item.TrangThai;
    let CSDienCu = item.CSDienCu;
    let CSDienMoi = item.CSDienMoi;
    let CSNuocCu = item.CSNuocCu;
    let CSNuocMoi = item.CSNuocMoi;

    return {
      NgayLap,
      TenPhong,
      Thang,
      TongTien,
      id,
      TrangThai,
      TenNT,
      CSNuocMoi,
      CSDienCu,
      CSDienMoi,
      CSNuocCu,
    };
  });
  return res.send(response);
});

// app.get("/bill", async (req, res) => {
//   const fetchDataPhieuThu = await TTPHIEUTHU.findAll({
//     include: [
//       {
//         model: PHONG,
//         include: { model: NHATRO },
//       },
//       { model: THANG },
//     ],
//   });

//   console.log("cs", fetchDataPhieuThu);

//   const response = await fetchDataPhieuThu.map((item) => {
//     let NgayLap = item.NgayLap;
//     let TenPhong = item.PHONG.TenPhong;
//     let Thang = item.THANG.Thang;
//     let TenNT = item.PHONG.NHATRO.TenNT;
//     let TongTien = item.TongTien;
//     let id = item.id;
//     let TrangThai = item.TrangThai;
//     let CSDienCu = item.CSDienCu;
//     let CSDienMoi = item.CSDienMoi;
//     let CSNuocCu = item.CSNuocCu;
//     let CSNuocMoi = item.CSNuocMoi;

//     return {
//       NgayLap,
//       TenPhong,
//       Thang,
//       TongTien,
//       id,
//       TrangThai,
//       TenNT,
//       CSNuocMoi,
//       CSDienCu,
//       CSDienMoi,
//       CSNuocCu,
//     };
//   });
//   return res.send(response);
// });

// HÓA ĐƠN ĐÃ THU

app.get("/bill-house-state/:NHATROId", async (req, res) => {
  const fetchDataPhieuThu = await TTPHIEUTHU.findAll({
    where: { NHATROId: req.params.NHATROId, TrangThai: "Đã thu" },
    include: [
      {
        model: PHONG,
        include: { model: NHATRO },
      },
      { model: THANG },
    ],
  });

  console.log("cs", fetchDataPhieuThu);

  const response = await fetchDataPhieuThu.map((item) => {
    let NgayLap = item.NgayLap;
    let TenPhong = item.PHONG.TenPhong;
    let Thang = item.THANG.Thang;
    let TenNT = item.PHONG.NHATRO.TenNT;
    let TongTien = item.TongTien;
    let id = item.id;
    let TrangThai = item.TrangThai;
    let CSDienCu = item.CSDienCu;
    let CSDienMoi = item.CSDienMoi;
    let CSNuocCu = item.CSNuocCu;
    let CSNuocMoi = item.CSNuocMoi;

    return {
      NgayLap,
      TenPhong,
      Thang,
      TongTien,
      id,
      TrangThai,
      TenNT,
      CSNuocMoi,
      CSDienCu,
      CSDienMoi,
      CSNuocCu,
    };
  });
  return res.send(response);
});

app.get("/bill/:id", async (req, res) => {
  const id = Number(req.params.id);
  const dongia = await THANG.findOne({ where: { TrangThai: "Đang áp dụng" } });
  const phieuthu = [
    await TTPHIEUTHU.findByPk(req.params.id, {
      include: [
        { model: NHATRO },
        {
          model: THANG,
        },
        {
          model: PHONG,
          include: [
            { model: DV_P, include: [{ model: DICHVU }] },
            { model: LOAIPHONG, include: [{ model: GIAPHONG }] },
          ],
        },
      ],
    }),
  ];
  const filterDichVu_GiaPhong = await phieuthu.filter((item) => item.id === id);
  console.log("dichvu_giaphong", filterDichVu_GiaPhong);
  let dv = [];
  let giaDv = [];
  const tenVagiaDV = filterDichVu_GiaPhong[0].PHONG.DV_Ps.map(async (e) => {
    console.log("e", e);
    let giaDichVu = await e.DICHVUId.map(async (id) => {
      let dichvu = await DICHVU.findByPk(id);
      return { TenDV: dichvu.TenDV, DonGia: dichvu.DonGia };
    });
    console.log("giaDv", giaDichVu);
    return await Promise.all(giaDichVu);
  });
  const temp = await Promise.all(tenVagiaDV);
  const result = temp.map((e) => {
    console.log("ac", e);
    const kq = e.map((i) => {
      dv.push({ TenDV: i.TenDV, DonGia: i.DonGia });
      giaDv.push(i.DonGia);
    });
    console.log("kq", kq);
  });
  // console.log("result", result, tenDv, giaDv);

  const giaphong = filterDichVu_GiaPhong[0].PHONG.LOAIPHONG.GIAPHONGs.map(
    (e) => {
      return e.GiaPhong;
    }
  );

  const billArr = [];
  phieuthu.map(async (a) => {
    let temp = {
      TenNT: a.NHATRO.TenNT,
      Sdt: a.NHATRO.Sdt,
      TenPhong: a.PHONG.TenPhong,
      Thang: a.THANG.Thang,
      CSDienCu: a.CSDienCu,
      CSDienMoi: a.CSDienMoi,
      CSNuocCu: a.CSNuocCu,
      CSNuocMoi: a.CSNuocMoi,
      NgayLap: a.NgayLap,
      TongTien: a.TongTien,
      DonGiaDien: dongia.DonGiaDien,
      DonGiaNuoc: dongia.DonGiaNuoc,
      GiaPhong: giaphong,
      dichvu: dv,
      giadichvu: giaDv,
    };
    billArr.push(temp);
  });

  return res.status(200).send(billArr);
});

// hóa đơn theo phòng
// app.get("/hoadon/:PHONGId", async (req, res) => {
//   const ttPhieuThu = await TTPHIEUTHU.findAll({
//     where: { PHONGId: req.params.PHONGId },
//   });

//   const thuyduyngokngek = await ttPhieuThu.map(async (ttpt) => {
//     let thang = await THANG.findOne({ where: { id: ttpt.dataValues.THANGId } });
//     return {
//       thang: thang.dataValues.Thang,
//       tongTien: ttpt.dataValues.TongTien,
//       trangThai: ttpt.dataValues.TrangThai,
//       id: ttpt.dataValues.id,
//     };
//   });

//   return res.status(200).send(await Promise.all(thuyduyngokngek));
// });

app.get("/hoadon/:PHONGId", async (req, res) => {
  const ttPhieuThu = await TTPHIEUTHU.findAll(
    { where: { PHONGId: req.params.PHONGId } }
    // { include: [{ model: PHONG }] }
  );
  console.log("ttpt", ttPhieuThu);

  const thuyduyngokngek = await ttPhieuThu.map(async (ttpt) => {
    let thang = await THANG.findOne({ where: { id: ttpt.dataValues.THANGId } });
    return {
      thang: thang.dataValues.Thang,
      tongTien: ttpt.dataValues.TongTien,
      trangThai: ttpt.dataValues.TrangThai,
      id: ttpt.dataValues.id,
      ChiSoDienCu: ttpt.dataValues.CSDienCu,
      ChiSoDienMoi: ttpt.dataValues.CSDienMoi,
      ChiSoNuocMoi: ttpt.dataValues.CSNuocMoi,
      ChiSoNuocCu: ttpt.dataValues.CSNuocCu,
      // TenPhong: ttpt.PHONG.TenPhong,
    };
  });

  return res.status(200).send(await Promise.all(thuyduyngokngek));
});

// lập hóa đơn
app.post("/create-bill", async (req, res) => {
  console.log(req.body);
  const csdn = await CHISO_DN.create({
    ChiSoDien: req.body.ChiSoDienMoi,
    ChiSoNuoc: req.body.ChiSoNuocMoi,
    PHONGId: req.body.idPhong,
    THANGId: req.body.IdThangHT,
  });

  const phieuthu = await PHIEUTHU.create({
    TrangThai: req.body.TrangThai,
    PHONGId: req.body.idPhong,
    THANGId: req.body.IdThangHT,
    NgayLap: req.body.NgayLap,
    TongTien: req.body.tongtien,
  });

  const item = {
    PHONGId: req.body.idPhong,
    THANGId: req.body.IdThangHT,
    NgayLap: req.body.NgayLap,
    TongTien: req.body.tongtien,
    CSDienMoi: req.body.ChiSoDienMoi,
    CSNuocMoi: req.body.ChiSoNuocMoi,
    CSDienCu: req.body.ChiSoDienCu,
    CSNuocCu: req.body.ChiSoNuocCu,
    NHATROId: req.body.nhatroId,
    TrangThai: req.body.TrangThai,
  };
  return await TTPHIEUTHU.create(item)
    .then((ttpt) => res.status(201).send(ttpt))
    .catch((error) => res.status(400).send(error));
});

// cập nhật hóa đơn
app.put("/update-bill/:id", (req, res) => {
  return TTPHIEUTHU.update(req.body, { where: { id: req.params.id } })
    .then(res.status(200).send("updated"))
    .catch((error) => res.status(400).send(error));
});
// xóa hóa đơn
app.delete("/delete-bill/:id", (req, res) => {
  return TTPHIEUTHU.destroy({ where: { id: req.params.id } })
    .then(res.status(200).send("deleted"))
    .catch((error) => res.status(400).send(error));
});

app.post("/booking", (req, res) => {
  return PHIEUDATPHONG.create(req.body)
    .then((dp) => res.status(201).send(dp))
    .catch((error) => res.status(400).send(error));
});

app.get("/list-booking/:id", async (req, res) => {
  const phieudat = await PHIEUDATPHONG.findByPk(req.params.id, {
    include: [{ model: PHONG }],
  });
  const id = phieudat.id;
  const HoTen = phieudat.HoTen;
  const TenPhong = phieudat.PHONG.TenPhong;
  const TrangThai = phieudat.TrangThai;
  const ThoiDiemDat = phieudat.updatedAt;
  const Sdt = phieudat.Sdt;
  const NamSinh = phieudat.NamSinh;
  const GioiTinh = phieudat.GioiTinh;
  const SLNguoiO = phieudat.SLNguoiO;
  const NhuCauSD = phieudat.NhuCauSD;
  const NgheNghiep = phieudat.NgheNghiep;

  return res.send({
    id,
    HoTen,
    TenPhong,
    TrangThai,
    ThoiDiemDat,
    Sdt,
    NamSinh,
    GioiTinh,
    SLNguoiO,
    NhuCauSD,
    NgheNghiep,
  });
});

app.put("/update-status-booking/:id", (req, res) => {
  return PHIEUDATPHONG.update(req.body, { where: { id: req.params.id } })
    .then(res.status(200).send("updated"))
    .catch((error) => res.status(400).send(error));
});

app.delete("/delete-booking/:id", (req, res) => {
  return PHIEUDATPHONG.destroy({ where: { id: req.params.id } })
    .then(res.status(200).send("deleted"))
    .catch((error) => res.status(400).send(error));
});

app.get("/list-booking", async (req, res) => {
  const fetchData = await PHIEUDATPHONG.findAll({
    include: [
      {
        model: PHONG,
        include: { model: NHATRO },
      },
    ],
  });
  const response = await fetchData.map((phieudat) => {
    let id = phieudat.id;
    let HoTen = phieudat.HoTen;
    let TenPhong = phieudat.PHONG.TenPhong;
    let TrangThai = phieudat.TrangThai;
    let ThoiDiemDat = phieudat.updatedAt;
    let Sdt = phieudat.Sdt;
    let NamSinh = phieudat.NamSinh;
    let GioiTinh = phieudat.GioiTinh;
    let SLNguoiO = phieudat.SLNguoiO;
    let NhuCauSD = phieudat.NhuCauSD;
    let NgheNghiep = phieudat.NgheNghiep;
    let TenNT = phieudat.PHONG.NHATRO.TenNT;

    return {
      TenNT,
      id,
      TenPhong,
      HoTen,
      NgheNghiep,
      Sdt,
      TrangThai,
      GioiTinh,
      NamSinh,
      SLNguoiO,
      NhuCauSD,
      ThoiDiemDat,
    };
  });
  return res.send(response);
});

app.get("/tongphieudk", (req, res) => {
  return PHIEUDATPHONG.findAll({ where: { TrangThai: "Chưa duyệt" } })
    .then((pdp) => res.status(200).send(pdp))
    .catch((error) => res.status(400).send(error));
});

app.post("/getMonthByString", async (req, res) => {
  const month = req.body.prevMonth ? req.body.prevMonth : req.body.currentMonth;
  console.log("month", req.body, month);
  const itemMonth = await THANG.findOne({
    where: { Thang: month },
  });
  console.log("month", itemMonth);
  return res.send(itemMonth);
});

app.post("/getChiSoByIdPhongThang", async (req, res) => {
  console.log("request", req.body);
  const response = await CHISO_DN.findOne({
    where: { PHONGId: req.body.idPhong, THANGId: req.body.idThang },
  });
  console.log("respones", response);
  return res.send(response);
});

app.post("/send-mail", async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "duyb1805681@student.ctu.edu.vn",
        pass: "DLt$kPRW",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const TenNT = req.body.TenNT;
    const Sdt = req.body.Sdt;
    const Thang = req.body.Thang;
    const TenPhong = req.body.TenPhong;
    const TongDien = req.body.TongDien;
    const TongNuoc = req.body.TongNuoc;

    let info = await transporter.sendMail({
      from: '"NHÀ TRỌ MINI HOUSES" <sender@gmail.com>', // sender address
      to: "thuyduy190500@gmail.com", // list of receivers
      subject: "THÔNG BÁO CHỈ SỐ ĐIỆN NƯỚC NHÀ TRỌ MINI HOUSES ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>Tên nhà trọ: ${TenNT}</p>
            <p>Số điện thoại: ${Sdt}</p>
            <p>Tháng: ${Thang}</p>
            <p>Tên phòng: ${TenPhong}</p>
            <p>Tổng số điện: ${TongDien}</p>
            <p>Tổng số nước: ${TongNuoc}</p>
      `, // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200).send("success");
  } catch (e) {
    console.log("error", e);
    res.status(500).send("error");
  }
});

app.get("/thang", (req, res) => {
  return THANG.findAll()
    .then((t) => res.status(200).send(t))
    .catch((error) => res.status(400).send(error));
});

app.post("/thongkedoanhthu", async (req, res) => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  let formatMY;
  if (month === 0) {
    formatMY = "12" + "/" + (year - 1);
  } else {
    formatMY = req.body.value;
  }
  console.log("format", req.body.value);
  const thang = await THANG.findOne({ where: { Thang: formatMY } });
  const ttptArr = await TTPHIEUTHU.findAll({ where: { THANGId: thang.id } });
  console.log("tháng", ttptArr);
  let doanhthu = await ttptArr
    .map((ttpt) => ttpt.TongTien)
    .reduce((a, c) => {
      return a + c;
    });
  console.log("dt", doanhthu);
  return res.send({ doanhthu: doanhthu.toLocaleString("it-IT") });
  // return res.send(doanhthu);
});

app.get("/thongkekhachthue", (req, res) => {
  return KHACHTHUE.findAll({ where: { TrangThai: "Đang ở" } })
    .then((p) => res.status(200).send(p))
    .catch((error) => res.status(400).send(error));
});

app.listen(PORT, (error) => {
  if (!error) console.log("App is listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
