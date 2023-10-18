import { Schema, model } from "mongoose";

export interface Task {
  id: string;
  title: string;
  description: string;
}

export const TaskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const TaskModel = model<Task>("task", TaskSchema);
