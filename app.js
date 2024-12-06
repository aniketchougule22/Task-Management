const express = require("express");
const { devConfig } = require("./config");
require("./src/config/db");
const app = express();
app.use(express.json());

const { task } = require("./src/routes");

app.use("/task", task);


app.use((req,res)=>{
    res.status(404).json({
        status: false,
        message: 'Ohh you are lost, read the API documentation to find your way back home :)'
    });
});


app.listen(devConfig.port.port || 3001, () => {
    console.log(`server running on port ${devConfig.port.port}`);
});

