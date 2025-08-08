import mysql from'mysql2'


export const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'madhu05$',
    database:'blog'
})