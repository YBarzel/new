const
    express = require("express"),
    app = express(),
    jwt = require("jsonwebtoken"),
    secret = "1234"

const users = [{
    _id: "1222333",
    name: "avi",
    email: "w@w",
    pass: "155"
}]

function createToken (id){
    const token = jwt.sign({_id:id},secret,{expiresIn:"1m"})
    return token
}

function authToken (token){
    const decode = jwt.verify(token,secret)
    console.log(decode);
    const id= decode._id
    const findUser = users.find(u=>u._id===id)
    return findUser
}

function login(email, pass) {
    const findUser = users.find(u => u.email === email)
    if (!findUser || findUser.pass !== pass) throw "not auth"
    const token =createToken(findUser._id)
    return token
}

function log() {
    try {
        const token = login("w@w", "155")
        const res = authToken(token)
        console.log(token);
        console.log(res);
    }
    catch (error) {
        console.log(error)
    }
}

log()

app.listen(3210, () => console.log("server is running"))