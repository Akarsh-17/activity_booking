const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = (req,res,next) => {
    console.log("reached auth")
    try{
        console.log("cookie" , req.cookies.token);
        console.log("header", req.header("Authorization"));

        const token=req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        if(!token|| token==undefined)
        {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }
        
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        console.log('printing payload in middleware ',payload);
        if (Date.now() >= payload.exp * 1000) {
            res.clearCookie('token'); 
            return res.status(401).json({
                success: false,
                message: 'Token has expired',
            });
        }
        
        req.user = payload;

        next();
    }
    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        });
    }
}