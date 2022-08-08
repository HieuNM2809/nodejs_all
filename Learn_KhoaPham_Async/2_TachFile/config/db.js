const mysql = require('mysql');
var dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
};
var con;
function handleDisconnect() {
  con = mysql.createConnection(dbConfig); 
  con.connect(function(err) {             
    if(err) {                            
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }else{
      console.log("MySql Connected!!!");  
    }                              
  });                                 
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                       
    } else {                      
      throw err;      
    }
  });
}
handleDisconnect();
module.exports = con;
