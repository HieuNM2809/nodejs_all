const express = require('express');
var  con  = require('./config/db.js');
const {query, queryAllUser} = require('./config/query');
const app = express()
const port = 3000;

//  ?? : thuộc tính
//   ? : giá trị
// var userId = 'hieunm47;select 1;';
// var userId = 'hieunm47';
// var columns = ['user_name', 'user_level'];
// con.query('SELECT ?? FROM ?? where user_name  = ?', [columns, 'kb_users', userId], function (error, results, fields) {
//   if (error) throw error;
//   console.log(results); 
// });
// return;

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/list', async (req, res) => {
    const results = await queryAllUser(con);
    res.json({ results }); 
})
app.get('/user', async (req, res) => {
    const results = await query(con, 'SELECT * FROM kb_users where user_name = ?', ['hieunm47']);
    res.json({ results }); 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))