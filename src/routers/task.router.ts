import { Router } from "express";
import asyncHandler from "express-async-handler";
import { TaskModel } from "../models/task.model";
import { sample_tasks } from "../data";
const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const tasksCount = await TaskModel.countDocuments();
    if (tasksCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await TaskModel.create(sample_tasks);
    res.send("Seed Is Done!");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tasks = await TaskModel.find();
    res.send(tasks);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const tasks = await TaskModel.find({ name: { $regex: searchRegex } });
    res.send(tasks);
  })
);

router.get(
  "/:TaskId",
  asyncHandler(async (req, res) => {
    const Task = await TaskModel.findById(req.params.TaskId);
    res.send(Task);
  })
);

export default router;
