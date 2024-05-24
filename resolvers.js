const { Query } = require("mongoose");
const Task = require("./models/Task");

const resolvers = {
  Query: {
    hello: () => "Hello world",
    goodBye: () => "GoodBye!",
    getAllTasks: async () => {
      const tasks = await Task.find();

      return tasks;
    },
    async getTask(_, args) {
      const task = await Task.findById(args.id);
      return task;
    },
  },
  Mutation: {
    createTask: async (parent, args, context, info) => {
      //   console.log("Parent:");
      //   console.log(parent);

      //   console.log("Args:");
      console.log(args);

      //   console.log("Context:");
      //   console.log(context);

      //   console.log("Info:");
      //   console.log(info);

      const { title, description } = args;

      const newTask = new Task({
        title,
        description,
      });

      await newTask.save();

      return newTask;
    },
    async deleteTask(_, { id }) {
      const task = await Task.findByIdAndDelete(id);
      return task;
    },
    async updateTask(_, { id, task }) {
      const ut = await Task.findByIdAndUpdate(
        id,
        {
          $set: task,
        },
        { new: true }
      );

      return ut;
    },
  },
};

module.exports = { resolvers };
