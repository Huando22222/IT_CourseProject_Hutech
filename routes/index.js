const express = require("express");
const Router = express.Router();
const passport = require("passport");
const User = require('../models/User');

const mongoose = require('mongoose');
const {mutipleMongooseToObject,mongooseToObject} =require('../models/User');
const Contents = require("../models/Contents");
const Goods = require("../models/Goods");
const Boughts = require("../models/Boughts");
Router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//let user ;// không được , phải fix 


Router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
  }),
  function (req, res,next) {
    const { email, fullname, secret, googleId } = req.user;
    const {_id,pic, identity ,admin } = req.user;
    console.log("test Session từ /auth/google/callback ||| req.user:",req.user);
    // Gửi thông tin người dùng cho client
    req.session.user= {
      email,
      fullname,
      secret,
      googleId,
      _id,
      pic,
      identity,
    };
    // req.session.save();
    // console.log("test Session từ /auth/google/callback ||| req.user:",req.user);
    // console.log("test Session từ /auth/google/callback ||| req.session.user:",req.session.user);
    res.redirect(
      // `http://localhost:3000`   
      //`http://localhost:3000?email=${req.user.email}&fullname=${req.user.fullname}&secret=${req.user.secret}&googleId=${req.user.googleId}`
      `http://localhost:3000?email=${req.user.email}&fullname=${req.user.fullname}&secret=${req.user.secret}}`
    );
  }
  //   req.session.passport.user = {
  //     email,
  //     fullname,
  //     secret,
  //     googleId,
  //     _id,
  //     pic,
  //     identity,
  //   };
  //   req.session.save();
  //   console.log("test Session từ /auth/google/callback ||| req.user:",req.session.passport.user );
  //   res.redirect("http://localhost:3000");
  // }
);

Router.get('/api/info',async(req, res) => {
  try {
    const allUsers = await User.find({});
    res.send({status:"ok",data:allUsers});
  }catch (e) {
    console.log(error);
  }
})

Router.get('/api/infoContents',async(req, res) => {
  try {
    const contents = await Contents.find();
    res.json(contents);
  }catch (e) {
    console.log(error);
  }
})


const bodyParser = require('body-parser');
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(bodyParser.json());


Router.post('/api/loginGG',async (req, res) => {
  
  // console.log("test Session từ /api/loginGG");
  // const user = req.session.passport.user;
  // console.log("test Session từ /auth/google/callback ||| req.user:",user );
  // // console.log("test req.user: ",req.user);
  // console.log("test req.session: ",req.session);
  // console.log("test req.session.user : ",req.session.user);
  // console.log("test : ",user);
  
});


Router.post('/api/login', async (req, res) => {
  try {
    const { identity, password ,emailURL, fullnameURL,secretURL} = req.body;
    let user;
    // console.log(emailURL,fullnameURL,secretURL);
    if (identity && password) {
      // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
      user = await User.findOne({ identity: identity });

      if (user && user.password === password) {
        // Đăng nhập thành công bằng MSSV
        res.status(200).json({ message: 'Đăng nhập thành công bằng MSSV', user });
        return;
      }
    }

    if (emailURL) {
      
      user = await User.findOne({ email: emailURL });
      console.log("user sử dụngGG",user);
      console.log("user.fullname: ",user.fullname);
      console.log("user.fullname: ",fullnameURL);
      console.log("user.user.secret: ",user.secret);

      const secretTMP= user.secret+"}";
      console.log("user.user.secret: ",secretTMP);
      console.log("user.user.secret: ",secretURL);
      if (user && user.fullname === fullnameURL && secretTMP === secretURL) {
        
        // console.log("xac minh thành công gửi lên client");
        res.status(200).json({ message: 'Đăng nhập thành công bằng GG', user });
        return;
      }
    }

    // Sai thông tin đăng nhập
    res.status(401).json({ error: 'Sai thông tin đăng nhập' });
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
});


Router.post('/api/showGoods', async (req, res) => {
  try {
    const { typeOfGoods,searchValue } = req.body;
    let goods;
    console.log(typeOfGoods,searchValue);
    
    if (searchValue === null || searchValue.trim() === '') {
      // Chuỗi là null hoặc có chứa khoảng trắng
      if(typeOfGoods === "tất cả"){
        goods = await Goods.find({});
        res.status(200).json({ message: 'Show Goods', goods });
        // console.log(goods);
        return;
      }
  
      // goods = await Goods.find({ loai: typeOfGoods });
      goods = await Goods.find({ loai: { $regex: new RegExp('^' + typeOfGoods + '$', 'i') } });// không phân biệt uppercase or lowercase  
      res.status(200).json({ message: 'Show Goods', goods });
      // console.log(goods);
      return;
    } else {
      // Chuỗi không phải là null và không chứa khoảng trắng
      const goods = await Goods.find({ tenSanPham: { $regex: searchValue, $options: 'i' } });
      res.status(200).json({ message: 'Show Goods', goods });
    }

    
    return;
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
});

Router.post('/api/showPurchased', async (req, res) => {
  try {
    const { idUser,allowed} = req.body;
    let boughts;
    

    if (allowed==="true") {
      boughts  = await Boughts.find({ });
      // res.status(200).json({  boughts });
      // console.log("purchased: ",idUser,boughts);
      const modifiedBoughts = boughts.map(bought => ({
        ...bought.toObject(),
        goods: bought.goods.map(item => ({ ...item.toObject() }))
      }));
      res.status(200).json({ boughts: modifiedBoughts });
      console.log("truy cap toan quyen vao purchased: ", idUser, modifiedBoughts);
      return;
     
    } else if(allowed==="false"){

      if (idUser) {
        boughts  = await Boughts.find({ user: idUser});
        // res.status(200).json({  boughts });
        // console.log("purchased: ",idUser,boughts);
        const modifiedBoughts = boughts.map(bought => ({
          ...bought.toObject(),
          goods: bought.goods.map(item => ({ ...item.toObject() }))
        }));
        res.status(200).json({ boughts: modifiedBoughts });
        console.log("purchased: ", idUser, modifiedBoughts);
        return;
       
      } else {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
        return;
      }
    }
    
    return;
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
});


Router.post('/api/boughts', async (req, res) => {
  const { user, goods, total } = req.body;

    console.log("user, goods, total: ",user, goods, total);
  const newBoughts = new Boughts({
    _id: new mongoose.Types.ObjectId(),
    user,
    goods,
    total,
  });
  console.log("newBoughts: ",newBoughts);
  newBoughts.save()
    .then(() => {
      res.status(200).json({ message: 'Dữ liệu đã được lưu thành công vào MongoDB' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Lỗi khi lưu dữ liệu vào MongoDB', error });
    });
});


Router.post('/api/addGoods', async (req, res) => {
  const { tenSanPham,price,img,loai } = req.body;

    console.log("data add goods : ",tenSanPham,price,img,loai);
  const newGoods = new Goods({
    _id: new mongoose.Types.ObjectId(),
    tenSanPham,
    img,
    loai,
    price
  });
  console.log("newGoods: ",newGoods);
  newGoods.save()
    .then(() => {
      res.status(200).json({ message: 'Dữ liệu đã được lưu thành công vào MongoDB' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Lỗi khi lưu dữ liệu vào MongoDB', error });
    });
});


const cors = require('cors');

Router.use(cors());
module.exports = Router;
