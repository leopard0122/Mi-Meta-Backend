const config = require('../config/config');
const bcrypt = require("bcryptjs");
const path = require('path');
const Appearence = require('../models/Appearence');
const MenuSetting = require('../models/MenuSetting');
const Footer = require('../models/Footer');
const Communication = require('../models/Communication');
const Create = require('../models/Create');
const Marketplace = require('../models/Marketplace');
const Wallet = require('../models/Wallet');
const { result } = require('lodash');
const Permission = require('../models/Permission');
const User = require('../models/User');
const Font = require('../models/Font');

exports.SaveAppearence = (req, res) => {
  const inputValues = JSON.parse(req.body.inputValues);
  if(req.files) {
    if(req.files.lightImage) {
      var lightImage = req.files.lightImage;
      lightImage.name = `light-${Date.now()}${path.parse(lightImage.name).ext}`;
      lightImage.mv(`${config.UPLOAD_URL}/images/${lightImage.name}`, async err => {
        if (err) {
          return res.send({ result: 'Failed to upload NID' });
        }
      });
      inputValues.lightImage = lightImage.name;
    }
    if(req.files.darkImage) {
      var darkImage = req.files.darkImage;
      darkImage.name = `dark-${Date.now()}${path.parse(darkImage.name).ext}`;
      darkImage.mv(`${config.UPLOAD_URL}/images/${darkImage.name}`, async err => {
          if (err) {
          return res.send({ result: 'Failed to upload NID' });
          }
      });
      inputValues.darkImage = darkImage.name;
    }
  }
 
  Appearence.find().sort({ _id: -1 }).then((data,err)=> {
      Appearence.findOneAndUpdate({_id:data._id}, inputValues, {upsert: true}, function(err, doc) {
        if (err) return res.status(500).json(err);
        return res.status(200).json('Succesfully saved.');
      });
      // Appearence.findOne({_id:data._id},(err,data)=>{
      //   data.save(inputValues)
  
      // })
    
  })
};

exports.GetAppearence = (req, res)=> {
  Appearence.find().sort({ _id: -1 }).then((data,err)=> {
    if(err) return res.status(500).send(err)
    res.status(200).send(data)
  })
}

exports.SaveMenuSetting = (req,res) => {
  console.log(req.body)
  const newData = new MenuSetting(req.body);
  newData.save((err,result)=>{
    if(err) return res.status(500).json("Not saved");
    return res.status(200).json("Successfully Saved")
  })
}

exports.GetMenuSetting = (req,res)=> {
  MenuSetting.findOne({}, {}, { sort: { 'date' : -1 } },(err,result)=> {
    if(err) return res.status(500).json("Server error");
    return res.status(200).json(result)
  });

}

exports.GetFooter = (req,res) => {
  Footer.findOne({}, {}, { sort: { 'date' : -1 } },(err,result)=> {
    if(err) return res.status(500).json("Server error");
    return res.status(200).json(result)
  });
}

exports.SaveFooter = (req,res) => {
  const inputValues = JSON.parse(req.body.inputValues);
 
  const enableLogo = JSON.parse(req.body.enableLogo);
  if(req.files) {
    if(req.files.imageUrl) {
      var imageUrl = req.files.imageUrl;
      imageUrl.name = `footer-${Date.now()}${path.parse(imageUrl.name).ext}`;
      imageUrl.mv(`${config.UPLOAD_URL}/images/${imageUrl.name}`, async err => {
        if (err) {
          return res.send({ result: 'Failed to upload NID' });
        }
      });
      inputValues.imageUrl = imageUrl.name;
    }
  }
  
  inputValues.enableLogo = enableLogo.value;

  Footer.find().sort({ _id: -1 }).then((data,err)=> {
    Footer.findOneAndUpdate({_id:data._id}, inputValues, {upsert: true}, function(err, doc) {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Succesfully saved.');
    });
  })
}

exports.GetCommunication = (req,res) => {
  Communication.findOne({}, {}, { sort: { 'date' : -1 } },(err,result)=> {
    if(err) return res.status(500).json("Server error");
    return res.status(200).json(result)
  });
}

exports.SaveCommunication = (req,res) => {
  const socialData = JSON.parse(req.body.socialData);
  const contactData = JSON.parse(req.body.contactData);
  const emailData = JSON.parse(req.body.emailData);
  if(req.files) {
    if(req.files.imageUrl) {
      var imageUrl = req.files.imageUrl;
      imageUrl.name = `contact-${Date.now()}${path.parse(imageUrl.name).ext}`;
      imageUrl.mv(`${config.UPLOAD_URL}/images/${imageUrl.name}`, async err => {
        if (err) {
          return res.send({ result: 'Failed to upload NID' });
        }
      });
      contactData.imageUrl = imageUrl.name;
    }
  }

  Communication.find().sort({ _id: -1 }).then((data,err)=> {
    Communication.findOneAndUpdate({_id:data._id}, {socialData, contactData, emailData}, {upsert: true}, function(err, doc) {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Succesfully saved.');
    });
  })
}

exports.GetCreateData = (req ,res) => {
  Create.findOne({}, {}, { sort: { '_id' : -1 } },(err,result)=> {
    if(err) return res.status(500).json("Server error");
    return res.status(200).json(result)
  });
  

}

exports.SaveCreateData = (req ,res) => {
  Create.find().sort({ _id: -1 }).then((data,err)=> {
    Create.findOneAndUpdate({_id:data._id}, req.body, {upsert: true}, function(err, doc) {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Succesfully saved.');
    });
  })
}

exports.GetMarketPlace = (req, res) => {
  Marketplace.findOne({}, {}, { sort: { '_id' : -1 } },(err,result)=> {
    if(err) return res.status(500).json("Server error");
    return res.status(200).json(result)
  });
}

exports.SaveMarketPlace = (req, res) => {
  Marketplace.find().sort({ _id: -1 }).then((data,err)=> {
    Marketplace.findOneAndUpdate({_id:data._id}, req.body, {upsert: true}, function(err, result) {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Succesfully saved.');
    });
  })
}

exports.GetWallet = (req, res) => {
  var id = req.tokenData.id;
  Wallet.findOne({adminId:id}).then((data,err)=> {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
  })
}

exports.SaveWallet = (req, res) => {
  var id = req.tokenData.id;
  Wallet.find({adminId:id}).then((data,err)=> {
    Wallet.findOneAndUpdate({adminId:id}, req.body, {upsert: true}, function(err, result) {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Succesfully saved.');
  });
   
    // else {
    //   const newWallet = new Wallet(req.body);
    //   newWallet.adminId = id;
    //   newWallet.save().then((result,err1)=> {
    //     console.log(result);
    //     console.log(err1);
    //     if (err1) return res.status(500).json(err1);
    //     return res.status(200).json('Succesfully saved.');
    //   })
    // }
    
  })
}

exports.GetPermission = (req, res) => {
  Permission.findOne({}, {}, { sort: { '_id' : -1 } },(err,result)=> {
    if(err) return res.status(500).json("Server error");
    return res.status(200).json(result)
  });
}

// exports.getPermissionbybyRole = (req,res) => {

// }

exports.SavePermission = (req, res) => {
  const {superAdminRole, adminRole, managerRole } = req.body
  Permission.find().sort({ _id: -1 }).then((data,err)=> {
    Permission.findOneAndUpdate({_id:data._id}, {superAdminRole, adminRole, managerRole}, {upsert: true}, function(err,result) {
      if (err) return res.status(500).json(err);
      // const newUser = new User(userData);
      // bcrypt.genSalt(12, (err, salt) =>
      //   bcrypt.hash(newUser.password, salt, (err1, hash) => {
      //     if (err1) return res.status(500).json(err1);
      //     newUser.password = hash;
      //     newUser.save();
      //   })
      // );
      res.status(200).json(result)
      
    });
  })
}

exports.getFonts=(req,res)=>{
  Font.find().then((fonts,err)=>{
    if(err) return res.status(403).json("Server error");
    return res.status(200).json(fonts);
  });
}
exports.createFonts=(req,res)=>{
  Font.find().then((result)=> {
    if(result.length > 1) return;
    let fontList = [{name:"Montserrat"},{name:"Robot"},{name:"Italic"},{name:"Arial"}];
    fontList.forEach(element => {
      const newFont = new Font(element);
      newFont.save();
    });

  })
 
}