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