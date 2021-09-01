const express = require('express');

//express object
const app = express();

//applying middleware to convert unreadable data to js object 
app.use(express.json());

// type of request
// call a url


//localhost:7000/veena - get

app.get("/veena", (req, res) => {

    res.send({ message: "Hello guys, let's meet " });

})

//localhost:7000/kushi - get

app.get("/kushi", (req, res) => {

        res.send({ message: "Hello manu" });

    })
    //localhost:7000/manu - get

app.get("/manu", (req, res) => {

    res.send({ message: "Hello kushi" });

})

app.post("/create", (req, res) => {

    console.log(req.body);

    res.send({ message: "Post is working great" });

})




//How to create and run it
app.listen(7000, () => {
    console.log("server is good, we can make it");
})