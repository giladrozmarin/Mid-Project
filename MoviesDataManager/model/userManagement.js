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
        data.users[index].lastLogin =  data.users[index].lastLogin
        data.users[index].dailyTransactions =  data.users[index].dailyTransactions
    }
    else
    {
        let source = {
            ["lastLogin"]:"",
            ["dailyTransactions"]:""
        }
        const returnedTarget = Object.assign(obj, source);
           console.log(returnedTarget)
        data.users.push(obj)
    }
    usersDAL.setUsers(data.users)
  
}
exports.updateTransactions = async(Username) =>
{
    let data = await usersDAL.getUsers()
    let index = -1
    data.users.map((v,i) => {if(v.Username === Username)  index=i } )
   


        data.users[index].dailyTransactions = data.users[index].dailyTransactions-1
    

    
    
    console.log(data.users)
    usersDAL.setUsers(data.users)
  
}
exports.loadCredit = async(Username) =>
{
    let data = await usersDAL.getUsers()
    let index = -1
    data.users.map((v,i) => {if(v.Username === Username.Username)  index=i } )
    console.log(index)
    
      
        data.users[index].lastLogin =  Username.lastLogin
        data.users[index].dailyTransactions = Username.dailyTransactions 
        console.log(data.users)
        usersDAL.setUsers(data.users)
    }

       
    
 
  


