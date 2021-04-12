// CONTAIN USER INFO
const users = [];

// JOIN USER TO CHAT
const onUserJoin = (id, username, room) => {
    const user = { id, username, room };
    users.push(user);

    return user;
}

// GET CURRENT USER
const getCurrentUser = id => {
    return users.find(user => user.id === id);
}

// GET ALL USERS IN ROOM
const getAllUsersInRoom = room => {
    return users.filter(user => user.room === room);
}

// LEAVE USER FROM CHAT
const onUserLeave = id => {
    const index = users.findIndex(user => user.id === id);

    return index !== -1 ? users.splice(index, 1)[0] : void 0;
}

module.exports = {
    onUserJoin,
    getCurrentUser,
    getAllUsersInRoom,
    onUserLeave,
};
