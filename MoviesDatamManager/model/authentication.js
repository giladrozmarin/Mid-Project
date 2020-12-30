const usersDAL = require('../DAL/usersDAL')
const userManagement = require('./userManagement')

exports.authenticationUser = async (userName,password) => {
    //get data user list
    let data = await usersDAL.getUsers();
    return user = data.users.filter(x => (x.Username === userName) && (x.Password ===password))

}
exports.authCredit = (req) => {

     if(req.session.transactions > 0 || req.session.transactions === true){
        if(typeof req.session.transactions !== "boolean")
        {
            console.log(req.session.transactions)
         req.session.transactions = req.session.transactions-1
         userManagement.updateTransactions(req.session.user)
        }
        return true
     }
     else return false


}