const router = require("express").Router();
const ListModel = require("../Schemas/list");
const UserModel = require("../Schemas/user");

//add task
router.post("/addTask", async (req, res) => { 
  try {
    const { title, body, id } = req.body;
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const list = new ListModel({ title, body, user: existingUser._id });
    await list.save();

    existingUser.list.push(list._id);
    await existingUser.save();

    res.status(201).json({ list, message: "Task added successfully", success: true }); 
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});


//get all tasks
router.get("/getTasks/:id", async(req, res)=>{
    try{
        const list = await ListModel.find({user: req.params.id}).sort({createdAt: 1});
        if(list.length !== 0)
            res.status(200).json({list: list});
        else
            res.status(404).json({message: "No tasks found", success: false});

    }
    catch(err){
        res.status(500).json({message: err.message, success: false});
    }
});

//update task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, userId } = req.body; // use id (user id)
    console.log("Update request for task:", req.params.id, "by user:", userId);
    if (!userId) return res.status(400).json({ message: "User id required", success: false });

    // find the task
    const task = await ListModel.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found", success: false });

    // check ownership: task.user should match userId
    if (task.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to update this task", success: false });
    }

    // update and return the new document
    const updated = await ListModel.findByIdAndUpdate(
      req.params.id,
      { title, body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ list: updated, message: "Task updated successfully", success: true });
  } catch (err) {
    console.error("Update task error:", err);
    return res.status(500).json({ message: err.message, success: false });
  }
});


//delete task
router.delete("/deleteTask/:id", async(req,res)=>{
    try{
        const { id } = req.body;
        const existingUser = await UserModel.findByIdAndUpdate(id, { $pull: { list: req.params.id } });
        if(existingUser){
            await ListModel.findByIdAndDelete(req.params.id);
            existingUser.list = existingUser.list.filter((item) => item._id.toString() !== req.params.id);
            await existingUser.save();
            res.status(200).json({message: "task deleted successfully", success: true});
        }

    }
    catch(err){
        res.status(500).json({message: err.message, success: false});
    }
});



module.exports = router;