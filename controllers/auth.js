
const User = require('../model/User');

//code to add user statically
exports.login = async (req,res,next)=>{
    await User.create({
        firstName: "Chiruhas",
        lastName: "Bobbadi",
        password:"Chiruhs26",
        email:"chiruhas.bobbadi123@gmail.com",
        isAdmin:false
    });
    console.log("hello");
}

// verify auth
exports.postLogin =async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    const records =  await User.findAll({
        where: { email: email }
    });

   if(records.length ==0){
       // no user
       res.json({"status":401,"message":"no user present"});
   }else{

       if(records[0].password == password){
           req.session.isLoggedIn = true;
            req.session.userId = records[0].id;
           res.json({"status":200,"message":"authorized","isAdmin":records[0].isAdmin, "userId":records[0].id});
       }else{
           res.json({"status":401,"message":"wrong password"});
       }
   }



};


