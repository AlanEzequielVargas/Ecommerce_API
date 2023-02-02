const AuthService = require("../services/auth.service");
const transporter = require('../utils/mailer');
require('dotenv').config()

const register = async (req,res) => {
     try {
          const user = req.body;
          const result = await AuthService.register(user);
          if(result){
               const cart = await AuthService.createCart(result);
               res.status(201).json({
                    message: 'user created'
               });
               await transporter.sendMail({
                    to: result.email,
                    from: process.env.OWNER_MAIL,
                    subject: 'Email confirmation',
                    html: '<h1>Welcome to virtual store</h1> <p>To confirm your email</p> <a href="#" target="new_blank">Click here</a>'
               });

          }else {
               res.status(400).json({message: 'something wrong'});
          }
     }catch (error) {
          res.status(400).json(error.message);
     }
};

const login = async (req,res) => {
     try {
          const {email , password} = req.body;
          if(!email){
               res.status(400).json({
                    error: 'Missing data',
                    message: 'Not email provided'
               })
          };
          if(!password){
               res.status(400).json({
                    error: 'Missing data',
                    message: 'not password provided'
               })
          };
          const result = await AuthService.login({email,password});
          if(result.isValid){
               const {username , id , email} = result.user;
               const userData = {username , id , email};
               const token = AuthService.genToken(userData);
               userData.token = token;
               res.json(userData);
          }else {
               res.status(400).json({
                    message: 'Something wrong'
               });
          }
     } catch (error) {
          res.status(400).json(error.message);
     }
}

module.exports = {
     register,
     login
};








