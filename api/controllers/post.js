import { json } from 'express';
import{db} from '../db.js'
import jwt from 'jsonwebtoken'

export const getPosts=(req,res)=>{
    const q = req.query.cat ? 'select * from posts where cat=?':'select * from posts';

    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.status(500).send(err);
        
        return res.status(200).json(data);
    })

}

export const getPost=(req,res)=>{
    const q = 'select `username`,`title`,`desc`,p.img,`cat`,`date` from users u join posts p on u.id=p.uid where p.id=? '

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data[0])
    })
}

export const addPost=(req,res)=>{
    res.json('from controller')
}

export const deletePost=(req,res)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not Authenticated!")

    jwt.verify(token,'jwtkey',(err,userInfo)=>{
        if(err) return res.status(403),json("token is not valid")
        const postId = req.params.id
        const q ="delete from posts where `id`=? and `uid`=?"
        db.query(q,[postId,userInfo.id],(err,data)=>{
            if(err) return res.status(403).json("You cannot delete a post")
            return res.json("post has been deleted")
        })
    })
    
}

export const updatePost=(req,res)=>{
    res.json('from controller')
}

