const axios = require('axios');
const urlUsers = 'https://jsonplaceholder.typicode.com/users';

const getUsers = async ()=>{
    console.log('IN USERS DAL')
    const users = await axios.get(urlUsers)
    return users
}

module.exports = { getUsers };