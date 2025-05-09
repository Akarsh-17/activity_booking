const User = require('../modals/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema} = require("../validations/userValidation");

exports.signUp =async (req,res) => {
    const {error} = registerSchema.validate(req.body);
    // console.log(error)
    if(error) return res.status(400).send(error.details[0].message);
    const {name, email ,phone, password} = req.body;
    try{
        const exisitingUserByEmail = await User.findOne({email});
        if(exisitingUserByEmail) {
            return res.status(400).json({message: "Email/user already exists"});
        }

        const hashPass = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            phone,
            password: hashPass
        })

        return res.status(201).json({
            success:true,
            message:'User registered sucessfully ',
            newUser
        })
    }
    catch(error) {
        console.log(error)
        return res.status(500).json({
          success:false,
          message:'user can not be registered/ internal error'
        })
    }
}

exports.loginUser= async (req,res) =>{
    const {error} = loginSchema.validate(req.body);
    // console.log(error)
    if(error) return res.status(400).send(error.details[0].message);

    const {email, password} = req.body;

    try{
        const user =  await User.findOne({email});
        if(!user) return res.status(400).json({message: "no user found with given email"})

        const payload = {
            email: user.email,
            id: user._id,
        } 
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "password is incorrect"});

        const token=jwt.sign(payload,
            process.env.JWT_SECRET,
            {
                expiresIn:'48h'
            }
        )
        user.password=undefined;
        return res.cookie("token", token).status(200).json({
            success: true,
            message: 'User logged in successfully',
            user,
            token
        });
    } catch(error) {
        console.log(error)
        return res.status(500).json({
          success:false,
          message:'user can not be loggedIn/ internal error'
        })
    }
}




