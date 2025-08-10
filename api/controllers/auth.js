import {db} from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = (req,res)=>{
    // check existing users
    const q = "select * from users where email=? or username=?";

    db.query(q,[req.body.email,req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists");

        //hash the password and create a user.
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);

        const q = "insert into users(`username`,`email`,`password`) values(?)"

        const values =[req.body.username,req.body.email,hash]

        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err);
            return res.status(200).json("User created")
        })
    })
}

export const login = (req,res)=>{
    // check user 
    const q = 'select * from users where username=?'

    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length==0) return res.status(404).json("user not found");
        // if exists check password.
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("wrong password or username !")

        const token = jwt.sign({id:data[0].id},'jwtkey');
        const {password, ...other} = data[0];
        res.cookie("access_token",token,{httpOnly:true}).status(200).json(other);

    })
}

export const logout = (req,res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("user has been logged out")
}