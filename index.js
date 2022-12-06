
const express = require('express');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const sequelize = require('./util/database')
const device_mgmt = require('./routes/device_mgmt')
const auth = require('./routes/auth');
const billing = require('./routes/billing');
const home = require('./routes/home');
const control_configure = require('./routes/control_configure');
const service = require('./routes/service');

const multer = require('multer');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const logger = require('morgan');

const user = require('./model/user');
const camera = require('./model/camera');
const ele = require('./model/electricity_meter');
const fan = require('./model/fan');
const light = require('./model/light');

/* no sql models */
const f = require('./model/nosql/fan');
const c = require('./model/nosql/camera');
const f1 = require('./model/nosql/light');
const c1 = require('./model/nosql/water_meter');
//todo add weather sensor




//const sys = require('./model/system_selection');
const water = require('./model/water_meter');
const weather = require('./model/weather_sensor');


let SERVER_PORT = 4000;




const app = express();

const store = new MongoDBStore({
    uri:'mongodb+srv://ch:password_123@cluster0.ahucb7m.mongodb.net/dashboard' ,
    collection: 'sessions'
});
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}));



app.use(bodyParser.json());
app.use(express.json());
app.use(flash());
app.use(express.urlencoded({extended: false}));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
});


app.use(auth);
app.use(device_mgmt);
app.use(control_configure);
app.use(billing);
app.use(home);
app.use(service);
app.use('/', (req, res) => {
    res.send("Hello friend")
});




sequelize.sync().then(res=>{
    //console.log("sql synced");
    mongoose.connect('mongodb+srv://ch:password_123@cluster0.ahucb7m.mongodb.net/dashboard')
        .then(result => {
            if (result) {

                console.log("Database connected");
                console.log(`server started on ${SERVER_PORT} `);
                app.listen(SERVER_PORT);
            } else {
                console.log("failed to connect db ");
                console.log(result);
            }

        })
        .catch(err => {
            console.log(err);
        });

}).catch(err=>{
    console.log(err);
    console.log("error syncing sql");
});


