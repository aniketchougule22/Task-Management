const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },

    description: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        default: "incomplete"
    },

    due_date: {
        type: Date
    },

    created_at: {
        type: Date,
        default: new Date()
    }
});

const tasks = mongoose.model("tasks", taskSchema);

insertOne = async (query) => {
    try{
        return await tasks(query).save();
    }catch (err) {
        return err
    }
}

find = async (query = {}, options = {}) => {
    try {
      const { searchText, sortBy, order, status, dueDate } = options;
      const filter = { ...query };
  
      if (searchText) {
        filter.$or = [
          { title: { $regex: searchText && searchText !== "" ? searchText : "", $options: "i" } },
          { description: { $regex: searchText && searchText !== "" ? searchText : "", $options: "i" } }
        ];
      }
  
      if (status) {
        filter.status = status === "complete" ? true : false;
      }
  
      if (dueDate) {
        let current_date = new Date();
        if (dueDate === "overdue") {
          filter.due_date = { $lt: current_date };
        } else if (dueDate === "upcoming") {
          filter.due_date = { $gte: current_date };
        }
      }
  
      const sort = {};
      if (sortBy) {
        let sort_order = order == "desc" ? -1 : 1;
        if (sortBy == "title") {
            sort.title = sort_order
        };
        if (sortBy == "createdAt") {
            sort.created_at = sort_order
        };
        if (sortBy == "dueDate") {
            sort.due_date = sort_order
        };
        if (sortBy == "status") {
            sort.status = sort_order
        };
    }
  
    return await tasks.find(filter).sort(sort);
    } catch (err) {
      return err;
    }
  };
  

findOne = async (query, select = {}) => {
  try{
      return await tasks.findOne(query).select(select);
  }catch (err) {
      return err
  }
}

updateOne = async (match, query) => {
  try{
      return await tasks.findOneAndUpdate(match, query, { new: true });
  }catch (err) {
      return err
  }
}

deleteOne = async (query) => {
  try{
      return await tasks.deleteOne(query);
  }catch (err) {
      return err
  }
}

module.exports = {
  insertOne,
  find,
  findOne,
  updateOne,
  deleteOne
};