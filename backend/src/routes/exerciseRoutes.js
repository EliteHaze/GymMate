import express from "express";
import {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
  getExerciseByTime,
  getExerciseByMuscles
} from "../controllers/exerciseController.js";

const router = express.Router();

router.get("/", getAllExercises);
router.get("/time/:time", getExerciseByTime); 
router.get("/muscles", getExerciseByMuscles);
router.get("/:id", getExerciseById);
router.post("/", createExercise);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export default router;