const usersDAL =require('../DAL/usersDAL')


exports.getUserList = async () => {
 

    let data = await usersDAL.getUsers()
     
    return data.users.map(v => v.Username)
}

exports.getUser = async (Username) => {
 

    let data = await usersDAL.getUsers()
    
    return data.users.filter(v => v.Username === Username)
}

exports.deleteUser = async(Username) =>
{ 
    let data = await usersDAL.getUsers()

    let newData =  data.users.filter( x =>   x.Username != Username )
  
    usersDAL.setUsers(newData)
}

exports.updateUser = async(obj) =>
{
    let data = await usersDAL.getUsers()
    let index = -1
    
    data.users.map((v,i) => {if(v.Username === obj.Username)  index=i } )
    if(index != -1)
    {
        data.users[index].Username = obj.Username
        data.users[index].Password = obj.Password
        data.users[index].CreatedDate = obj.CreatedDate
        data.users[index].NumOfTransactions = obj.NumOfTransactions
    }
    else
    {
        data.users.push(obj)
    }
    usersDAL.setUsers(data.users)
  
}