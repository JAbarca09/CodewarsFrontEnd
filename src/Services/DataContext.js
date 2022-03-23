function checkToken(){
    let result = false;
    let lsData = localStorage.getItem('Token');
    if(lsData && lsData != null)
    {
        result = true;
    }
    return result;
}

//These are the User Endpoints

//Create Account
async function createAccount(createdUser){
    let res = await fetch('http://localhost:5031/User/AddUser', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(createdUser)
    });

    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data)
    return data;
}

//Login
async function login(userInfo){
    let res = await fetch('http://localhost:5031/User/Login', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(userInfo)
    });

    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data)
    return data;
}

//Update User
async function updateUser(id, codeWarName, cohortName, isAdmin, isDeleted){
    let res = await fetch('http://localhost:5031/User/UpdateUsername/'+id+'/'+codeWarName+'/'+cohortName+'/'+isAdmin+'/'+isDeleted, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify()
    });

    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data)
    return data;
}

//GetAllUsers
async function getAllUsers(){
    let res = await fetch("http://localhost:5031/User/GetAllUsers");
    let data = await res.json();
    // console.log(data);
    return data;
}

//GetUserByUsername
async function getUserByUsername(codeWarName){
    let res = await fetch("http://localhost:5031/User/GetUserByUsername/"+codeWarName);
    let data = await res.json();
    // console.log(data);
    return data;
}

//GetUserById
async function getUserById(id){
    let res = await fetch("http://localhost:5031/User/GetUserByUsername/"+id);
    let data = await res.json();
    // console.log(data);
    return data;
}