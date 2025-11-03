import mongoose from 'mongoose';

/*
 * This schema stores each individual log entry.
 * It will be an array inside the Habit schema.
 */
const LogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  didDoIt: {
    type: Boolean,
    required: true,
  },
});

/*
 * This is the main schema for the habit itself.
 */
const HabitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this habit.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  logs: [LogSchema], // An array of log entries
});

export default mongoose.models.Habit || mongoose.model('Habit', HabitSchema);