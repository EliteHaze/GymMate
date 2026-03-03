import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema(
  {
    exerciseName: {
      type: String,
      required: true
    },
    muscleGroup: {
      type: [String],
      required: true
    },
    sets: {
      type: Number,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },
    restTime: {
      type: Number,
      required: true
    },
    workoutId: {
      type: String,
      required: true
    },
    timeDuration: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Exercise", ExerciseSchema);