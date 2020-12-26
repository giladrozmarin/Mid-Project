const usersDAL = require('../DAL/usersDAL')

exports.authenticationUser = async (userName,password) => {
    //get data user list
    let data = await usersDAL.getUsers();
    return user = data.users.filter(x => (x.Username === userName) && (x.Password ===password))

}