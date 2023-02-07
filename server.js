const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config({ path: "config/.env" });
const Users = require("./models/Users")
const PASSWORD = process.env.PASSWORD;
const USER = process.env.USER;



mongoose
  .connect(
    `mongodb+srv://${USER}:${PASSWORD}@cluster0.zjkcy7e.mongodb.net/App?retryWrites=true&w=majority`
  )
  .then(() => console.log("DBS is connected.."))
  .catch((err) => console.log(err));

// Create and save users
const createUser = async () => {
  try {
   const newUser = new Users ({
    userName:"bilel",
    email:"bilel28@gmail.com",
    phone:55784637,
    age:27,
   });
    const user = await newUser.save();
  } catch (error) {
    if (err) throw err;
  }
};
//createUser();

//HOME PAGE
app.get("/", (req, res) => {
    res.send("HELLO FRIENDS");
});

//   GET Method
app.get("/users", (req, res) => {
    Users.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

// POST Method
app.post("/add-user", (req, res) => {
    let newUser = req.body;
    Users.create([newUser])
        .then((result) => res.send(result))
        .catch((err) => console.log("err", err));
});

// PUT Method
app.put("/edit-user/:id", (req, res) => {
    let userID = req.params.id;
    let body = req.body;
    Users.updateOne({ _id: userID }, { $set: body }, { strict: true }, (err) => {
        if (err) throw err;
    })
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

// DELETE Method
app.delete("/delete-user/:id", (req, res) => {
    let userID = req.params.id;
    console.log(typeof userID);
    Users.remove({ _id: userID }, (err) => {
        if (err) throw err;
    })
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});


app.listen(5000,(err) =>{
    if (err) throw err;
    console.log("server is up and running...")
});