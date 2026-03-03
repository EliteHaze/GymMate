import { useState } from "react";

const MUSCLE_GROUPS = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Full Body", "Cardio"];

const ExerciseForm = ({ initial = {}, onSubmit, loading, submitLabel = "Save" }) => {
  const [form, setForm] = useState({
    exerciseName: initial.exerciseName || "",
    muscleGroup: Array.isArray(initial.muscleGroup)
      ? initial.muscleGroup
      : initial.muscleGroup
      ? [initial.muscleGroup]
      : [],
    sets: initial.sets ?? "",
    reps: initial.reps ?? "",
    restTime: initial.restTime ?? "",
    workoutId: initial.workoutId || "",
    timeDuration: initial.timeDuration ?? "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleMuscle = (muscle) => {
    setForm((f) => {
      const current = f.muscleGroup;
      const updated = current.includes(muscle)
        ? current.filter((m) => m !== muscle)
        : [...current, muscle];
      return { ...f, muscleGroup: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.muscleGroup.length === 0) return;
    onSubmit({
      ...form,
      sets: Number(form.sets),
      reps: Number(form.reps),
      restTime: Number(form.restTime),
      timeDuration: Number(form.timeDuration),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Exercise Name */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Exercise Name</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Bench Press"
          className="input input-bordered w-full"
          value={form.exerciseName}
          onChange={set("exerciseName")}
          required
        />
      </div>

      {/* Muscle Group - Multi Select */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Muscle Group</span>
          <span className="label-text-alt text-base-content/50">Select all that apply</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {MUSCLE_GROUPS.map((g) => {
            const selected = form.muscleGroup.includes(g);
            return (
              <button
                key={g}
                type="button"
                onClick={() => toggleMuscle(g)}
                className={`btn btn-sm ${
                  selected ? "btn-primary" : "btn-ghost border border-base-300"
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
        {form.muscleGroup.length === 0 && (
          <p className="text-error text-xs mt-2">Please select at least one muscle group</p>
        )}
      </div>

      {/* Sets & Reps */}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Sets</span>
          </label>
          <input
            type="number"
            placeholder="e.g. 3"
            className="input input-bordered w-full"
            value={form.sets}
            onChange={set("sets")}
            min="1"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Reps</span>
          </label>
          <input
            type="number"
            placeholder="e.g. 10"
            className="input input-bordered w-full"
            value={form.reps}
            onChange={set("reps")}
            min="1"
            required
          />
        </div>
      </div>

      {/* Rest Time & Duration */}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Rest Time (seconds)</span>
          </label>
          <input
            type="number"
            placeholder="e.g. 60"
            className="input input-bordered w-full"
            value={form.restTime}
            onChange={set("restTime")}
            min="0"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Duration (minutes)</span>
          </label>
          <input
            type="number"
            placeholder="e.g. 30"
            className="input input-bordered w-full"
            value={form.timeDuration}
            onChange={set("timeDuration")}
            min="1"
            required
          />
        </div>
      </div>

      {/* Workout ID */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Workout ID</span>
          <span className="label-text-alt text-base-content/50">Group identifier</span>
        </label>
        <input
          type="text"
          placeholder="e.g. push-day-01"
          className="input input-bordered w-full font-mono"
          value={form.workoutId}
          onChange={set("workoutId")}
          required
        />
      </div>

      <div className="card-actions justify-end pt-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || form.muscleGroup.length === 0}
        >
          {loading ? <span className="loading loading-spinner loading-sm" /> : null}
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>

    </form>
  );
};

export default ExerciseForm;