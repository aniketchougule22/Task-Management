const mongoose=require('mongoose');
const { devConfig } = require('../../config');

mongoose.connect(devConfig.db.host,{dbName:devConfig.db.dbName}).then(()=>{
    console.log("connect to db succesfully");
}).catch(()=>{
    console.log("error to connect db");
})

