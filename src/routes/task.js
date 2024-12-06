const express = require("express");
const router = express.Router();
const { 
    createTask,
    getTaskById,
    getAllTasks,
    updateTask,
    deleteTask
 } = require("../controllers/task");
 
/* Create Task */
router.post("/", createTask);

/* Create Task */
router.get("/getTaskById", getTaskById);

/* Create Task */
router.patch("/", updateTask);

/* Create Task */
router.delete("/", deleteTask);

/* Create Task */
router.get("/getAllTasks", getAllTasks);


module.exports = router;