# expressToDoList

#### 介绍
基于express+MySQL实现的 ToDoList，实现增删改查

#### 软件架构
单个表，实现增删改查（用到中间件：body-parser解析post请求传递的对象、cors去跨域、express框架、mysql链接数据库）

db文件夹下expresstodolist.sql是数据库sql文件

front文件夹下index.html是简易的前端页，操作crud

app.js 全部的crud逻辑

expressToDoList.postman_collection.json 是Postman导出的文件，可导入Postman使用


#### 安装教程

npm install

#### 使用说明

node app.js（默认3999端口）