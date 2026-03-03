import { Link } from "react-router-dom";
import { Edit2, Trash2, Dumbbell, Clock, RotateCcw, Hash, Layers } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const MUSCLE_COLORS = {
  chest: "badge-primary",
  back: "badge-secondary",
  legs: "badge-accent",
  shoulders: "badge-warning",
  arms: "badge-info",
  core: "badge-error",
  "full body": "badge-neutral",
  cardio: "badge-ghost",
  default: "badge-ghost",
};

const getMuscleColor = (group) => {
  const key = (group || "").toLowerCase();
  return MUSCLE_COLORS[key] || MUSCLE_COLORS.default;
};

const ExerciseCard = ({ exercise, setExercises }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/${exercise._id}`);
      setExercises((prev) => prev.filter((e) => e._id !== exercise._id));
      toast.success("Exercise deleted successfully");
    } catch {
      toast.error("Failed to delete exercise");
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  const muscleGroups = Array.isArray(exercise.muscleGroup)
    ? exercise.muscleGroup
    : [exercise.muscleGroup];

  return (
    <>
      <div className="relative rounded-xl bg-base-100 border border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 p-5 flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 rounded-lg p-2">
              <Dumbbell className="size-4 text-primary" />
            </div>
            <h3 className="font-semibold text-base-content text-base leading-tight">
              {exercise.exerciseName}
            </h3>
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {muscleGroups.map((g) => (
              <span key={g} className={`badge badge-sm ${getMuscleColor(g)}`}>
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-base-200 rounded-lg px-3 py-2">
            <Layers className="size-3.5 text-primary shrink-0" />
            <div>
              <p className="text-xs text-base-content/50">Sets</p>
              <p className="font-semibold text-sm">{exercise.sets}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-base-200 rounded-lg px-3 py-2">
            <RotateCcw className="size-3.5 text-primary shrink-0" />
            <div>
              <p className="text-xs text-base-content/50">Reps</p>
              <p className="font-semibold text-sm">{exercise.reps}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-base-200 rounded-lg px-3 py-2">
            <Clock className="size-3.5 text-primary shrink-0" />
            <div>
              <p className="text-xs text-base-content/50">Rest</p>
              <p className="font-semibold text-sm">{exercise.restTime}s</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-base-200 rounded-lg px-3 py-2">
            <Clock className="size-3.5 text-warning shrink-0" />
            <div>
              <p className="text-xs text-base-content/50">Duration</p>
              <p className="font-semibold text-sm">{exercise.timeDuration} min</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-base-300">
          <div className="flex items-center gap-1.5">
            <Hash className="size-3 text-base-content/40" />
            <span className="text-xs text-base-content/40 font-mono truncate max-w-[100px]">
              {exercise.workoutId}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="tooltip tooltip-warning" data-tip="Edit exercise">
              <Link to={`/edit/${exercise._id}`} className="btn btn-ghost btn-xs text-warning">
                <Edit2 className="size-3.5" />
              </Link>
            </div>
            <div className="tooltip tooltip-error" data-tip="Delete exercise">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-ghost btn-xs text-error"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" /> Delete Exercise
            </h3>
            <p className="py-4 text-base-content/70">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-base-content">
                "{exercise.exerciseName}"
              </span>
              ?<br />
              This action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <Trash2 className="size-4" />
                )}
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ExerciseCard;