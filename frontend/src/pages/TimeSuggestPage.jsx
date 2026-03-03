import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import ExerciseCard from "../components/ExerciseCard.jsx";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Clock, SearchIcon, Zap } from "lucide-react";

const QUICK_TIMES = [15, 20, 30, 45, 60, 90];

const TimeSuggestPage = () => {
  const [time, setTime] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (t) => {
    const val = t || time;
    if (!val || Number(val) <= 0) {
      toast.error("Please enter a valid time in minutes");
      return;
    }
    setLoading(true);
    setSearched(false);
    try {
      const res = await api.get(`/time/${val}`);
      setResults(res.data);
      setSearched(true);
      if (res.data.length === 0) {
        toast("No exercises found for this duration", { icon: "🔍" });
      } else {
        toast.success(`Found ${res.data.length} exercise${res.data.length > 1 ? "s" : ""}!`);
      }
    } catch (error) {
      console.error("Error fetching by time", error);
      toast.error("Failed to fetch exercises");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 rounded-lg p-2">
              <Zap className="size-6 text-primary" />
            </div>
            <h2 className="font-display text-4xl tracking-wider text-base-content">
              SUGGEST BY TIME
            </h2>
          </div>
          <p className="text-base-content/50 text-sm ml-14">
            Enter how much time you have and we'll find matching exercises
          </p>
        </div>

        {/* Search Card */}
        <div className="card bg-base-100 shadow-md max-w-2xl mb-8">
          <div className="card-body">
            <h3 className="font-semibold text-base-content flex items-center gap-2 mb-4">
              <Clock className="size-4 text-primary" />
              How much time do you have?
            </h3>

            {/* Quick Select */}
            <div className="flex flex-wrap gap-2 mb-4">
              {QUICK_TIMES.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTime(String(t));
                    handleSearch(t);
                  }}
                  className={`btn btn-sm ${
                    String(t) === String(time) && searched
                      ? "btn-primary"
                      : "btn-ghost border border-base-300"
                  }`}
                >
                  {t} min
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="flex gap-3">
              <label className="input input-bordered flex items-center gap-2 flex-1">
                <Clock className="size-4 text-base-content/40" />
                <input
                  type="number"
                  placeholder="Custom minutes (e.g. 25)"
                  className="grow"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  onKeyDown={handleKeyDown}
                  min="1"
                />
                <span className="text-base-content/40 text-sm">min</span>
              </label>
              <button
                className="btn btn-primary"
                onClick={() => handleSearch()}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <SearchIcon className="size-4" />
                )}
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="bg-base-200 rounded-full p-6">
              <Clock className="size-10 text-base-content/30" />
            </div>
            <div>
              <p className="text-xl font-semibold text-base-content/60">
                No exercises for {time} minutes
              </p>
              <p className="text-sm text-base-content/40 mt-1">
                Try a different duration or add exercises with this time
              </p>
            </div>
          </div>
        )}

        {!loading && searched && results.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="size-4 text-primary" />
              <h3 className="font-semibold text-base-content">
                {results.length} exercise{results.length > 1 ? "s" : ""} for{" "}
                <span className="text-primary">{time} minutes</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((exercise) => (
                <ExerciseCard
                  key={exercise._id}
                  exercise={exercise}
                  setExercises={setResults}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSuggestPage;
