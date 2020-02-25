import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['OPEN', 'IN_PROGRESS', 'DONE'],
    default: 'OPEN',
  },
});
