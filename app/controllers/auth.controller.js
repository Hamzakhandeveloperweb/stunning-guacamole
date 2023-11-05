const db = require("../models");
const config = require("../config/auth.config");
const crypto = require('crypto');
const User = db.user;
const Role = db.role;
const Permission = db.permission;
const UserPermission = db.userpermission
const Token = db.token;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {sendingMail} = require("../nodemailer/mailing.js");


exports.signup = (req, res) => {
  
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    verified:false
  })
    .then(async (user )=> {
       let setToken = await Token.create({
        userId: user.id,
        token: crypto.randomBytes(16).toString("hex"),
      });

      if (setToken) {
        sendingMail({
          from: "verifyhylaemail@gmail.com",
          to: `${req.body.email}`,
          subject: "Account Verification Link",
          text: `Hello, ${req.body.username} Please verify your email by
                clicking this link :
                http://localhost:8080/api/users/verify-email/${user.id}/${setToken.token} `,
        });

        //if token is not created, send a status of 400
      } else {
        return res.status(400).send("token not created");
      }

      // if (req.body.roles) {
      //   Role.findAll({
      //     where: {
      //       name: {
      //         [Op.or]: req.body.roles
      //       }
      //     }
      //   }).then(roles => {
      //     user.setRoles(roles).then(() => {
      //       res.send({ message: "User registered successfully!" });
      //     });
      //   });
      // } else {
      //   // user role = 1
      //   user.setRoles([1]).then(() => {
      //     res.send({ message: "User registered successfully!" });
      //   });
      // }
    })
    .catch(err => {

      res.status(500).send({ message: err.message });
    });
};


exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    //find user by token using the where clause
    const usertoken = await Token.findOne({
      token,
      where: {
        userId: req.params.id,
      },
    });

    //if token doesnt exist, send status of 400
    if (!usertoken) {
      return res.status(400).send({
        msg: "Your verification link may have expired. Please click on resend for verify your Email.",
      });

      //if token exist, find the user with that token
    } else {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(401).send({
          msg: "We were unable to find a user for this verification. Please SignUp!",
        });

        //if user is already verified, tell the user to login
      } else if (user.verified) {
        return res
          .status(200)
          .send("User has been already verified. Please Login");

        //if user is not verified, change the verified to true by updating the field
      } else {
        const updated = await User.update(
          { verified: true },
          {
            where: {
              id: usertoken.userId,
            },
          }
        );

        //if not updated send error message
        if (!updated) {
          return res.status(500).send({ msg: err.message });
          //else send status of 200
        } else {
          return res
            .status(200)
            .send("Your account has been successfully verified");
        }
      }
    }
  } catch (error) {
  }
};

exports.signin = async (req, res) => { 
  try{
    const user = await  User.findOne({
      where: {
        username: req.body.username
      },
    })
  
    const permission =await  Permission.findAll({
      include: [
        {
          model: Role,
          where: { name: 'User' },
          attributes: [],
        },
      ],
      attributes: ['id', 'name'],
    })


    var passwordIsValid = false;
    if(req.body.password == user.password) {
      passwordIsValid = true
    }
    // var passwordIsValid = bcrypt.compareSync(
    //   req.body.password,
    //   user.password
    // );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

  const token = jwt.sign({ id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

    var authorities = [];
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.user_role,
        permission:permission,
        accessToken: token,
      });
  }
  catch(err) {
  }
  


  // User.findOne({
  //   where: {
  //     username: req.body.username
  //   },
  // })
  //   .then(user => {
  //     if (!user) {
  //       return res.status(404).send({ message: "User Not found." });
  //     }
  //   const permission = Permission.findAll({
  //     include: [
  //       {
  //         model: Role,
  //         where: { name: 'User' },
  //         attributes: [],
  //       },
  //     ],
  //     attributes: ['id', 'name'],
  //   })
  //   .then(()=>{
  //     var passwordIsValid = false;
  //     if(req.body.password == user.password) {
  //       passwordIsValid = true
  //     }
  //     // var passwordIsValid = bcrypt.compareSync(
  //     //   req.body.password,
  //     //   user.password
  //     // );

  //     if (!passwordIsValid) {
  //       return res.status(401).send({
  //         accessToken: null,
  //         message: "Invalid Password!"
  //       });
  //     }

  //   const token = jwt.sign({ id: user.id },
  //         config.secret,
  //         {
  //           algorithm: 'HS256',
  //           allowInsecureKeySizes: true,
  //           expiresIn: 86400, // 24 hours
  //         });

  //     var authorities = [];
  //       res.status(200).send({
  //         id: user.id,
  //         username: user.username,
  //         email: user.email,
  //         roles: authorities,
  //         accessToken: token,
  //         permission:permission
  //       });
  //     // user.getRoles().then(roles => {
  //     //   for (let i = 0; i < roles.length; i++) {
  //     //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
  //     //   }
      
  //     // });
  //   })
  //     // var passwordIsValid = bcrypt.compareSync(
  //     //   req.body.password,
  //     //   user.password
  //     // );
  //   })
  //   .catch(err => {
  //     res.status(500).send({ message: err.message });
  //   });
};
