const express = require("express");
const { UserModel } = require("./models/user.model");
const { default: mongoose } = require("mongoose");
const { TaskModel } = require("./models/task.model");
const router = express.Router();

// Register Route

router.route("/register").post(async (req, res) => {
  try {
    if (!req.body) throw new Error("Enter Data");

    const { name, email, password } = req.body;

    if (!name) throw new Error("Enter Name");
    if (!email) throw new Error("Enter Email-address");
    if (!password) throw new Error("Enter Password");

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error("Email is already registered");

    const user = await UserModel.create({
      name,
      email,
      password,
    });

    res
      .status(200)
      .send({ message: "Registered Successfully", token: user._id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Login Route

router.route("/login").post(async (req, res) => {
  try {
    if (!req.body) throw new Error("Enter Data");

    const { email, password } = req.body;

    if (!email) throw new Error("Enter Email-address");
    if (!password) throw new Error("Enter Password");

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) throw new Error("Email not Found");

    if (existingUser.password !== password)
      throw new Error("Incorrect Password");

    res
      .status(200)
      .send({ message: "loggedIn Successfully", token: existingUser._id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.use((req, res, next) => {
  try {
    const token = req.headers["user"];
    if (!token) throw new Error("Login First");

    if (!mongoose.isValidObjectId(token)) throw new Error("Enter valid ID");

    req.user = token;

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Profile Route

router.route("/profile").get(async (req, res) => {
  try {
    const user = await UserModel.findById(req.user).select("-password");

    return res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ messafe: error.message });
  }
});

//Add-task

router.route("/add-task").post(async (req, res) => {
  try {
    if (!req.body) throw new Error("Enter Data");
    const { title, description, category } = req.body;

    if (!title) throw new Error("Title is required");
    if (!description) throw new Error("description is required");
    if (!category) throw new Error("category is required");

    await TaskModel.create({
      title,
      description,
      category,
      user: req.user,
    });

    res.status(200).send({ message: "Task Added Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// All Task

router.route("/all-task").get(async (req, res) => {
  try {
    const all_task = await TaskModel.find({ user: req.user });

    res.status(200).send(all_task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Task by id

router.route("/task/:id").get(async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id);

    res.status(200).send(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})
.put( async(req,res)=>{
  try {
    
      const id = req.params.id
       const { title, description, category } = req.body;

    if (!title) throw new Error("Title is required");
    if (!description) throw new Error("description is required");
    if (!category) throw new Error("category is required");

    await TaskModel.findByIdAndUpdate(id,{
      title,
      category,
      description
    })


    return res.status(200).send({message:"Task updated"})

  } catch (error) {
    res.status(400).send({message:error.message})
  }
})
.delete(async (req,res)=>{
  try {

    const task = await TaskModel.findByIdAndDelete(req.params.id)

    if(!task) throw new Errow("NO Task to delete")

res.status(200).send({message:"Task Deleted"})    
return

  } catch (error) {
res.status(400).send({message:error.message})    
    
  }
})



module.exports = router;
