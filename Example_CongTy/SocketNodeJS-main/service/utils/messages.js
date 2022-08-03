const moment = require('moment');

function formatMessage(userid,username, text,s_id) {
  return {
    userid,
    username,
    text,
    s_id,
    time: moment().format('yyyy-mm-dd hh:mm:ss')
  };
}

module.exports = formatMessage;
