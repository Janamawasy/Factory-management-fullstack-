
const usersWS = require('../DAL/usersDAL');

const getUsersData = async (username) => {

    const {data:users} = await usersWS.getUsers();
    const usersdata = [];
    users.forEach((user) => {
      usersdata.push({
        userId : user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      });
    });
    return usersdata
}

module.exports = { getUsersData };

