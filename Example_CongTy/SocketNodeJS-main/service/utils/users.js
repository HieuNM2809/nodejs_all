const users = [];
// const axios = require('axios');
// let range = { min: 0, max: 199 }
// let delta = range.max - range.min
// const rand = Math.round(range.min + Math.random() * delta)

// Join user to chat
function userJoin(id, username, room,s_id) {
  const user = { id, username, room,s_id };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};