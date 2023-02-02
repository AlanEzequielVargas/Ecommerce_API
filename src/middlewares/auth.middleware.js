const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = (req,res,next) => {
          let {authorization: token} = req.headers;
          token = token?.replace('Bearer ','');
          if(token){
               jwt.verify(
                    token,
                    process.env.JWT_SECRET,
                    {algorithms: 'HS512'},
                    (error,decode) => {
                         if(error){
                              res.status(400).json({message:'Validation error'})
                         }else if(decode){
                              next();
                         }
                    }
               )
          }else{
               res.status(498).json({message: 'No token provided'})
     }
     

};

module.exports = authMiddleware;