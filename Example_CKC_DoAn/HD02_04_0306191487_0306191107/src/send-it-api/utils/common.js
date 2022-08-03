const getToday = () => Date('UTC+07:00');

const stringToTime = (time) => {
  const date = new Date(time).toLocaleTimeString();
  return date;
};

const checkMemberLength = (length) => {
  if (length == 2) return false;
  if (length > 2) return true;
  return true;
};

const currentHost = 'http://localhost:8800';

module.exports = {
  currentHost,
  getToday,
  stringToTime,
  checkMemberLength,
};
