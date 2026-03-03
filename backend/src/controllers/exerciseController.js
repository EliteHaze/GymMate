import Exercise from "../models/ExerciseModel.js"

export async function getAllExercises(_, res){
    try {
        const exercises = await Exercise.find().sort({ createdAt: -1 })
        res.status(200).json(exercises)
    } catch (error) {
        console.error("Error in getAllExercises controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getExerciseById(req, res){
    try {
        const exercise = await Exercise.findById(req.params.id)
        if (!exercise) return res.status(404).json({ message: "Exercise not found" })
        res.status(200).json(exercise)
    } catch (error) {
        console.error("Error in getExerciseById controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createExercise(req, res){
    try {
        const {
            exerciseName,
            muscleGroup,
            sets,
            reps,
            restTime,
            workoutId,
            timeDuration
        } = req.body 

        if (
            !exerciseName ||
            !muscleGroup ||
            sets == null ||
            reps == null ||
            restTime == null ||
            !workoutId ||
            timeDuration == null
        ) {
            return res.status(404).json({ message: "All fields are required" })
        }

        const exercise = new Exercise({
            exerciseName,
            muscleGroup,
            sets,
            reps,
            restTime,
            workoutId,
            timeDuration
        })

        const savedExercise = await exercise.save()
        res.status(201).json(savedExercise)

    } catch (error) {
        console.error("Error in createExercise controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateExercise(req, res){
    try {
        const {
            exerciseName,
            muscleGroup,
            sets,
            reps,
            restTime,
            workoutId,
            timeDuration
        } = req.body

        const updateExercise = await
        Exercise.findByIdAndUpdate(
            req.params.id,
            {
                exerciseName,
                muscleGroup,
                sets,
                reps,
                restTime,
                workoutId,
                timeDuration
            },
            { new: true }
        )

        if (!updateExercise) return res.status(404).json({ message: "Exercise not found" })
        res.status(200).json(updateExercise)

    } catch (error) {
        console.error("Error in updateExercise controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteExercise(req, res){
    try {
        const deleteExercise = await
        Exercise.findByIdAndDelete(req.params.id)

        if (!deleteExercise) return res.status(404).json({ message: "Exercise not found" })
        res.status(200).json({ message: "Exercise deleted successfully" })

    } catch (error) {
        console.error("Error in deleteExercise controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getExerciseByTime(req, res){
    try {
        const exercises = await Exercise.find({
            timeDuration: Number(req.params.time)
        })

        res.status(200).json(exercises)

    } catch (error) {
        console.error("Error in getExerciseByTime controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
export async function getExerciseByMuscles(req, res) {
  try {
    const groups = req.query.groups?.split(",").map(g => g.trim());

    if (!groups || groups.length === 0) {
      return res.status(400).json({ message: "No muscle groups provided" });
    }

    // Return exercises that contain ALL selected muscle groups
    const exercises = await Exercise.find({
      muscleGroup: { $all: groups }
    });

    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error in getExerciseByMuscles controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}