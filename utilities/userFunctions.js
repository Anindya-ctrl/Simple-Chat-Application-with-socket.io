const users = [];

// JOIN USER TO CHAT
const onUserJoin = (id, username, room) => {
    const user = { id, username, room };
    users.push(user);

    return user;
}

// GET CURRENT USER
const getCurrentUser = id => {
    return users.findIndex(user => user.id === id);
}

const onUserLeave = (id, username, room) => {

}

module.exports = {
    onUserJoin,
    getCurrentUser,
};
