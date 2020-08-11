const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyparser = require("body-parser");
//导入cors模块,该模块为跨域所用
const cors = require('cors');
app.use(cors());
app.use(bodyparser.json())

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "expresstodolist",
})

db.connect(err => {
    if (err) throw err;
    console.log('连接成功')
})
// 创建数据库
// app.get("/createdb", (req, res) => {
//     let sql = "CREATE DATABASE nodemysql";
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result);
//             res.send("Datebase create success...")
//         }
//     })
// })
// 创建表
// app.get("/createpoststable", (req, res) => {
//     // 创建表 表名为posts id自增 title字符串长度255 body字符串长度255 主键是ID
//     let sql = "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(ID))";
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result);
//             res.send("posts表创建成功...")
//         }
//     })
// })
// 插入数据
app.get("/addpost2",(req,res) => {
    let param = req.query;
    let post = {title: param.title,body: param.body};
    let sql = "INSERT INTO posts SET ?";
    db.query(sql,post,(err, data) => {
        if(err){
            res.send({code: 500, msg: '新增失败'})
        }else{
            res.send({code: 200, msg: '新增成功'})
        }
    })
})
// 查询内容
app.get("/getposts",(req,res) => {
    if (!req.query.pageNo && !req.query.pageSize) {
        let sql = `SELECT * FROM posts`;
        db.query(sql,(err, data) => {
            if(err){
                res.send({code: 500, msg: '查询失败'})
            }else{
                res.send({code: 200, data, msg: '查询成功'})
            }
        })
        return
    }

    let pageNo = Number(req.query.pageNo) - 1 || 0
    let pageSize = Number(req.query.pageSize) || 2
    let sql = `SELECT * FROM posts LIMIT ${pageNo*pageSize},${pageSize}`;
    db.query(sql,(err, data) => {
        if(err){
            res.send({code: 500, msg: '查询失败'})
        }else{
            res.send({code: 200, data, msg: '查询成功'})
        }
    })
})
// 查询单条内容
app.get("/getposts/:id",(req,res) => {
    let pageNo = Number(req.query.pageNo) - 1 || 0
    let pageSize = Number(req.query.pageSize) || 2
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id} LIMIT ${pageNo*pageSize},${pageSize}`;
    db.query(sql,(err, data) => {
        if(err){
            res.send({code: 500, msg: '查询失败'})
        }else{
            res.send({code: 200, data, msg: '查询成功'})
        }
    })
})
// 更新内容
app.post("/updatepost",(req,res) => {
    const { title, body, id } = req.body    
    let sql = `UPDATE posts SET title = "${title}", body = "${body}" WHERE id = ${id}`
    db.query(sql,(err,result) => {
        if(err){
            res.send({code: 500, msg: '修改失败'})
        }else{
            res.send({code: 200, msg: '修改成功'})
        }
    })
})
// 删除内容
app.get("/deletepost/:id",(req,res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(sql,(err,result) => {
        if(err){
            res.send({code: 500, msg: '删除失败'})
        }else{
            res.send({code: 200, msg: '删除成功'})
        }
    })
})

app.listen(3999, () => {
    console.log('服务器开启：http://localhost:3999')
})