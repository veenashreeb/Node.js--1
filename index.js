const e = require('express');
const express = require('express');
const { get } = require('http');
const mongoose = require('mongoose');

//express object
const app = express();

//applying middleware to convert unreadable data to js object 
app.use(express.json());

// type of request
// call a url

mongoose.connect("mongodb://localhost:27017/princessapi", { useNewUrlParser: true }, () => {
    console.log("mongo server connected");
})

//schema structure and rules and regulations for collection
//before collectioin u have to do schema


//Schema for princess collection
const princessSchema = new mongoose.Schema({
    name: String,
    color: String,
    imageUrl: String
})


//connect this schema to your collection so we have to create model
//Model for princesss collection that will be used for all the operatioins.
const princessModel = new mongoose.model('princess', princessSchema);
//using this we can create ,retrive, delete and update the collections.


//Collection

// async function getData() {

//     let data = await princessModel.find({});

//     console.log(data);
// }

app.get("/princess", async(req, res) => {
    let princess = await princessModel.find({});


    res.send(princess);
})

//to fetch a single princess based on id
app.get("/princess/:id", async(req, res) => {

    let id = req.params.id;

    let princess = await princessModel.find({ _id: id });

    res.send(princess);

})


//to create a new princess
app.post("/princess", (req, res) => {

    let princess = (req.body);

    //create an object
    let princessObj = new princessModel(princess);

    princessObj.save((err, data) => {
        if (err == null) {
            res.send({ message: "princess not saved are " });
        }
    });

    res.send("message: princess saved in database");

})


//endpoint to delete a princess

app.delete("/princess/:id", (req, res) => {

    let id = req.params.id;
    // console.log(id);
    princessModel.deleteOne({ _id: id }, (err, data) => {
        if (err == null) {
            res.send({ message: "princess is deleted" });
        }

    })

    res.send({ message: "Deleted princess" });

})

//endpoint to delete a princess WRT color

app.delete("/princess/color/:color", (req, res) => {

    let age = req.params.age;
    // console.log(id);
    princessModel.deleteOne({ age: age }, (err, data) => {
        if (err == null) {
            res.send({ message: "princess is deleted" });
        }

    })

    res.send({ message: "Deleted princess" });

})

function getData() {

    princessModel.find({}, (err, data) => {
        //.then((data)=>{console.log(data)});
        if (err == null) {
            console.log(data);
        }

    })

}

//to update a princess

app.put("/princess/:id", (req, res) => {
    let id = req.params.id;

    let princess = req.body;

    princessModel.updateOne({ _id: id }, princess, (err, data) => {

        if (err === null) {
            res.send("princess is updated");
        }
    })
})

getData();

//How to create and run it
app.listen(8000, () => {
    console.log("server working");
})