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


   export const getPost = (req, res) => {
    const q = `
        SELECT 
            p.id,
            u.username,
            p.title,
            p.\`desc\`,
            p.img,
            p.cat,
            p.date
        FROM posts p
        JOIN users u ON u.id = p.uid
        WHERE p.id = ?
    `;

    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            console.error("Database error:", err.sqlMessage); // 👈 Debug SQL error
            return res.status(500).json(err);
        }
        return res.status(200).json(data[0]);
    });
};


export const addPost=(req,res)=>{
     const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not Authenticated!")

    jwt.verify(token,'jwtkey',(err,userInfo)=>{
        if(err) return res.status(403),json("token is not valid")
        const q= 'insert into posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) values(?)'

        const values =[
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err)
            return res.json("Post has been created");
        })
    })
}

export const deletePost=(req,res)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not Authenticated!")

    jwt.verify(token,'jwtkey',(err,userInfo)=>{
        if(err) return res.status(403).json("token is not valid")
        const postId = req.params.id
        const q ="delete from posts where `id`=? and `uid`=?"
        db.query(q,[postId,userInfo.id],(err,data)=>{
            if(err) return res.status(403).json("You cannot delete a post")
            return res.json("post has been deleted")
        })
    })
    
}

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `
      UPDATE posts 
      SET title = ?, \`desc\` = ?, img = ?, cat = ?
      WHERE id = ? AND uid = ?
    `;

    const postId = req.params.id;
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) {
        console.error("SQL error:", err.sqlMessage);
        return res.status(500).json(err);
      }
      return res.json("Post has been updated");
    });
  });
};


