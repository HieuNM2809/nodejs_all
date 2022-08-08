var query = async (con, q, params) => new Promise((resolve, reject) => {
  const handler = (error, result) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(result);
  }
  con.query(q, params, handler);
});
var queryAllUser = async (con) => new Promise((resolve, reject) => {
  const handler = (error, result) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(result);
  }
  con.query('select * from kb_users', handler);
});

module.exports = {query, queryAllUser}