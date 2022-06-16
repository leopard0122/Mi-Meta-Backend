const bcrypt = require("bcryptjs");
const fs = require('fs');
const Customer = require("../models/Customer"); // User model
const Admin = require("../models/Admin");
const Phase = require("../models/Phase");
const path = require('path');
const config = require('../config/config');

const { registerSchema, loginSchema } = require('../utils/userValidations');
const { generateAccessToken } = require("../utils/token-generator");
const { custom } = require("@hapi/joi");
exports.isAuth = (req,res,next) => {
  const sessUser = req.session.user;
  if(sessUser) {
      next();
  }
  else {
      err = res.status(401).json("You Need to Be Logged in to do this. Access Denied ")
      return err;
  }
};



exports.loginCustomer = (req, res) => {
  const { email, password } = req.body;
    
    Customer.findOne({ email }).then((customer) => {
      if (!customer) return res.status(400).json("Incorrect Email or Password");

      // Validate password
      bcrypt.compare(password, customer.password).then((isMatch) => {
        if (!isMatch) return res.status(400).json("Incorrect Password");

        const token =  generateAccessToken({ id: customer.id, name: customer.name, authority: 'customer', email: customer.email});

        const sessCustomer = { id: customer.id, name: customer.name, authority: 'customer', email: customer.email, token: token };
        req.session.user = sessCustomer; // Auto saves session data in mongo store
        res.json(sessCustomer); // sends cookie with sessionID automatically in response
      });
    });
};



exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;
    Admin.findOne({ email: email }).then((admin) => {
      if (!admin) return res.status(400).json("Incorrect Email");

      // Validate password
      bcrypt.compare(password, admin.password).then((isMatch) => {
        if (!isMatch) return res.status(400).json("Incorrect Password");
        const token =  generateAccessToken({ id: admin.id, name: admin.name, role: admin.role, email: admin.email,avatar:admin.avatar});
        const sessAdmin = { id: admin.id, name: admin.name, authority: 'admin', email: admin.email, token: token };
        req.session.user = sessAdmin; // Auto saves session data in mongo store

        res.json(sessAdmin); // sends cookie with sessionID automatically in response
      });
    });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    // delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("session-id"); // clears cookie containing expired sessionID
    res.send("Logged out successfully");
  });
}

exports.getCurrentUser = (req, res) => {
  // const id = req.tokenData.id
  const {id} = req.body
  Admin.findOne({_id:id}).then((admin) => {
    return res.json(admin);
  });
}

exports.changeAdmin = (req, res) => {
 
  const inputValues = JSON.parse(req.body.inputValues);
  const id = req.body.id
  if (req.files) {
    if(req.files.avatar) {
      var avatar = req.files.avatar;
      avatar.name = `avatar-${Date.now()}${path.parse(avatar.name).ext}`;
      avatar.mv(`${config.UPLOAD_URL}/avatars/${avatar.name}`, async err => {
          if (err) {
          return res.send({ result: 'Failed to upload NID' });
          }
      });
      inputValues.avatar = avatar.name;
    }
    if( req.files.banner) {
      var banner = req.files.banner;
      banner.name = `banner-${Date.now()}${path.parse(banner.name).ext}`;
      banner.mv(`${config.UPLOAD_URL}/images/${banner.name}`, async err => {
        if (err) {
        return res.send({ result: 'Failed to upload NID' });
        }
      });
      inputValues.banner = banner.name;
    }
  }

  Admin.findOneAndUpdate({_id:id}, inputValues, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.send('Succesfully saved.');
  });

}

exports.authChecker = (req, res) => {
  const sessUser = req.session.user;
  if (sessUser) {
    let authority = sessUser.authority;
  Customer.findOne({_id:sessUser.user_id}).then((customer)=>{
    return res.json({customer, authority});
  });
 
    
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

exports.createAdmin = () => {
  console.log("Create Admin")
  Admin.find({}).then((result) => {
    if(result.length>1) return;
    const newAdmin = new Admin({
      name: "Admin",
      email: "test@test.com",
      password: "test" ,
      role: "admin",
      avatar : "admin.jpg"
    });

    //Password hashing
    bcrypt.genSalt(12, (err, salt) =>
      bcrypt.hash(newAdmin.password, salt, (err, hash) => {
        if (err) throw err;

        newAdmin.password = hash;
        // Save user
        newAdmin
          .save()
          .then(
          )
          .catch((err) => console.log(err));
      })
    );
  })
}

exports.createSuperAdmin = () => {
  console.log("Create Admin")
  Admin.find({}).then((result) => {
    if(result.length>1) return;
    const superAdmin = new Admin({
      name: "Super Admin",
      email: "admin@admin.com",
      password: "admin" ,
      role: "SuperAdmin",
      avatar : "Robert.png"
    });

    //Password hashing
    bcrypt.genSalt(12, (err, salt) =>
      bcrypt.hash(superAdmin.password, salt, (err, hash) => {
        if (err) throw err;
        superAdmin.password = hash;
        superAdmin
          .save()
          .then(
          )
          .catch((err) => console.log(err));
      })
    );
  })
}

//update credits
exports.updateCredit = (req, res) => {
  const sessUser = req.session.user;
  //only for admin
  if(sessUser.authority !== 'admin') res.status(400).json("You are not permitted");

  const { user_id, user_state } = req.body;
  //update credit
  Customer
    .findOneAndUpdate({ _id: user_id }, { user_state: user_state, user_check: false })
    .then((credit) => {
      if(!credit) return res.status(400).json("Unknown credit");
      res.json("Successfully updated");
    })
}

exports.getUsers = (req,res) => {
  const sessUser = req.session.user;
  if (sessUser.authority==="admin") {
    Customer.find().then((customer)=>{
      return res.json(customer);
    });
  } else {
    return res.status(401).json({ msg: "Need admin permission to do this action." });
  }
}

exports.getInfo = (req, res) => {
  const sessUser = req.session.user;
  if(sessUser.authority === "customer") {
    Customer.findOne({_id: sessUser.user_id})
    .then((customer) => {
      return res.json(customer);
    });
  } else {
    return res.status(401).json({ msg: "Need customer permission to do this action." });
  }
}
exports.getAdmins = (req,res) => {
  Admin.find().then((admins,err)=>{
    if(err) return res.status(403).json("Server error");
    return res.status(200).json(admins);
  });
 
}
exports.getCustomer = (req,res) => {
  const id = req.params.id
  Customer.findOne({_id:id}).then((customer)=>{
    return res.status(200).json(customer);
  });
 
}
exports.getCustomersbyAdmin = (req,res) => {
  const {id} = req.tokenData;
  Customer.find({adminId:id}).then((customers)=>{
    return res.status(200).json(customers);
  });
 
}
exports.registerCustomerbyAdmin = (req, res) => {

  let path = '';
  const {email} = req.body;
  const {id} = req.tokenData;
  req.body.adminId = id;

  // if(req.file){
  //   const avatar = req.file;
  //   path = 'client/public/avatar/' + name + '_' + Date.now() + avatar.originalname.replace(/(.*)([.][^.]*)/, function(a,b,c){return c});

  //   try {
  //     fs.writeFileSync(path, avatar.buffer);
  //   } catch (err) {
  //     return console.log(err);
  //   }
  // }

  Customer.findOne({ email:email }).then((customer) => {
    if (customer) return res.status(403).json("Already existed")
    Phase.find()
    .sort({phase: 1})
    .then((phases) => {
      const registerCustomer = new Customer(req.body);
      registerCustomer.save().then((result,err)=> {
        if(err) return res.status(403).json("Failed")
        return res.status(200).json("Successfully Saved")
      })
    })
  });
};
exports.registerCustomerbySuper = (req, res) => {
  const {email} = req.body;
  Customer.findOne({ email:email }).then((customer) => {
    if (customer) return res.status(403).json("Already existed")
    const registerCustomer = new Customer(req.body);
    bcrypt.genSalt(12, (err, salt) =>
      bcrypt.hash(registerCustomer.password, salt, (err, hash) => {
        if (err) throw err;
        registerCustomer.password = hash;
        registerCustomer.save().then(res.json("Successfully Registered")).catch((err) => console.log(err));
      })
    );
  });
};
exports.resetPassword = (req, res) => {
  console.log("reset password")
  const {email,password} = req.body;
  Admin.findOne({ email:email }).then((user) => {
    console.log(user);
    if (!user) return res.status(403).json("Not existed user")
    bcrypt.genSalt(12, (err, salt) =>
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user.save().then(res.json("Successfully Reset")).catch((err) => console.log(err));
      })
    );
  });
};

exports.changeCustomer = (req, res) => {
 
  const id = req.body.id
 
  // if (req.files) {
  //   if(req.files.avatar) {
  //     var avatar = req.files.avatar;
  //     avatar.name = `avatar-${Date.now()}${path.parse(avatar.name).ext}`;
  //     avatar.mv(`${config.UPLOAD_URL}/images/${avatar.name}`, async err => {
  //         if (err) {
  //         return res.send({ result: 'Failed to upload NID' });
  //         }
  //     });
  //     inputValues.avatar = avatar.name;
  //   }
  //   if( req.files.banner) {
  //     var banner = req.files.banner;
  //     banner.name = `banner-${Date.now()}${path.parse(banner.name).ext}`;
  //     banner.mv(`${config.UPLOAD_URL}/images/${banner.name}`, async err => {
  //       if (err) {
  //       return res.send({ result: 'Failed to upload NID' });
  //       }
  //     });
  //     inputValues.banner = banner.name;
  //   }
  // }

  Customer.findOneAndUpdate({_id:id}, req.body, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.send('Succesfully saved.');
  });

}

exports.registerAdmin = (req, res) => {
  const {email} = req.body;
  Admin.findOne({ email:email }).then((admin) => {
    if (admin) return res.status(403).json("Already existed")
    const newadmin = new Admin(req.body);
    bcrypt.genSalt(12, (err, salt) =>
      bcrypt.hash(newadmin.password, salt, (err, hash) => {
        if (err) throw err;
        newadmin.password = hash;
        newadmin.save().then(res.json("Success")).catch((err) => console.log(err));
      })
    );
  });
};