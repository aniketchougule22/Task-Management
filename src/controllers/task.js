const { sendResponse } = require("../helpers/responseHandler");
const taskModel = require("../models/task")

/* Create Task */ 
const createTask = async (req, res) => {
    try {
        const createTask = await taskModel.insertOne(req.body);
        if (createTask._id) {
            sendResponse(res, 200, true, "Task created succesfully..!", createTask);
        } else {
            sendResponse(res, 400, false, "Error occuring while creating task", {});
        }
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, false, "Internal server error", error);
    }
}

/* Get Task By _id */ 
const getTaskById = async (req, res) => {
    try {
        const getTask = await taskModel.findOne({ _id: req.query.taskId });
        if (getTask) {
            sendResponse(res, 200, true, "Task found..!", getTask)
        } else {
            sendResponse(res, 400, false, "Task not found..!", {});
        }
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, false, "Internal server error", error);
    }
}

/* Update Task */ 
const updateTask = async (req, res) => {
    try {
        const update = await taskModel.updateOne({ _id: req.body.taskId }, { $set: req.body });
        if (update) {
            sendResponse(res, 200, true, "Task updated succesfully..!", update);
        } else {
            sendResponse(res, 400, false, "Error occuring while updating task", {});
        }
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, false, "Internal server error", error);
    }
}

/* Delete Task */ 
const deleteTask = async (req, res) => {
    try {
        const remove = await taskModel.deleteOne({ _id: req.query.taskId });
        if (remove) {
            sendResponse(res, 200, true, "Task deleted succesfully..!");
        } else {
            sendResponse(res, 400, false, "Error occuring while deleting task");
        }
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, false, "Internal server error", error);
    }
}

/* Get Tasks with Search & Filter */ 
const getAllTasks = async (req, res) => {
    try {
      const { searchText, sortBy, order, status, dueDate } = req.query;
  
      const tasks = await taskModel.find({}, { searchText, sortBy, order, status, dueDate });
  
      if (tasks.length > 0) {
        sendResponse(res, 200, true, "Tasks found successfully!", tasks);
      } else {
        sendResponse(res, 404, false, "No tasks found", []);
      }
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, false, "Internal server error", error);
    }
  };
  


module.exports = { 
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    getAllTasks
}