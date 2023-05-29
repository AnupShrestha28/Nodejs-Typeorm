// require
const express = require("express");
const dataSource = require("./config/db");
const todoRouters = require("./routes/todo.routes");
const bodyParser = require("body-parser");

// init
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// routes
app.use("/items", todoRouters);

// database connection
dataSource.initialize().then(()=>{
    console.log("Database Connected");

    // server activation
    app.listen(8000, ()=>{
        console.log("Server listening to port 8000");
    });
})
    .catch((err)=>{
        console.log(err);
    });

