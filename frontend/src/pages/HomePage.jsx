import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import ExerciseCard from "../components/ExerciseCard.jsx";
import ExerciseNotFound from "../components/ExerciseNotFound.jsx";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Search, Filter, X } from "lucide-react";

const MUSCLE_GROUPS = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Full Body", "Cardio"];

const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMuscles, setSelectedMuscles] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await api.get("/");
        setExercises(res.data);
      } catch (error) {
        console.error("Error fetching exercises", error);
        toast.error("Failed to load exercises");
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const toggleMuscle = (muscle) => {
    setSelectedMuscles((prev) =>
      prev.includes(muscle) ? prev.filter((m) => m !== muscle) : [...prev, muscle]
    );
  };

  const clearFilters = () => {
    setSelectedMuscles([]);
    setSearch("");
  };

  const filtered = exercises.filter((ex) => {
    const muscleGroups = Array.isArray(ex.muscleGroup)
      ? ex.muscleGroup
      : [ex.muscleGroup || ""];

    const matchSearch = (ex.exerciseName || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchMuscle =
      selectedMuscles.length === 0 ||
      muscleGroups.some((g) =>
        selectedMuscles.map((m) => m.toLowerCase()).includes(g.toLowerCase())
      );

    return matchSearch && matchMuscle;
  });

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="font-display text-4xl tracking-wider text-base-content">
            EXERCISE LIBRARY
          </h2>
          <p className="text-base-content/50 mt-1 text-sm">
            {exercises.length} exercises in your library
          </p>
        </div>

        {/* Search Bar */}
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <Search className="size-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search exercises..."
            className="grow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        {/* Muscle Filter Card */}
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body py-4 px-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-primary" />
                <span className="font-medium text-sm">Filter by Muscle Group</span>
                {selectedMuscles.length > 0 && (
                  <span className="badge badge-primary badge-sm">
                    {selectedMuscles.length} selected
                  </span>
                )}
              </div>
              {(selectedMuscles.length > 0 || search) && (
                <button
                  onClick={clearFilters}
                  className="btn btn-ghost btn-xs text-error gap-1"
                >
                  <X className="size-3" /> Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {MUSCLE_GROUPS.map((g) => (
                <button
                  key={g}
                  onClick={() => toggleMuscle(g)}
                  className={`btn btn-sm ${
                    selectedMuscles.includes(g)
                      ? "btn-primary"
                      : "btn-ghost border border-base-300"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {selectedMuscles.length >= 2 && (
              <p className="text-xs text-primary mt-2">
                Showing all exercises for: {selectedMuscles.join(" + ")}
              </p>
            )}
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-base-content/40 mb-4">
            Showing {filtered.length} exercise{filtered.length !== 1 ? "s" : ""}
            {selectedMuscles.length > 0 && ` for ${selectedMuscles.join(" + ")}`}
          </p>
        )}

        {/* Content */}
        {loading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <ExerciseNotFound
            message={
              selectedMuscles.length > 0
                ? `No exercises found for: ${selectedMuscles.join(" + ")}`
                : search
                ? "No exercises match your search"
                : "No exercises yet"
            }
          />
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((exercise) => (
              <ExerciseCard
                key={exercise._id}
                exercise={exercise}
                setExercises={setExercises}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;