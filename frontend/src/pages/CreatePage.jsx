import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import ExerciseForm from "../components/ExerciseForm.jsx";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";

const CreatePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/", data);
      toast.success("Exercise created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating exercise", error);
      toast.error(error?.response?.data?.message || "Failed to create exercise");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-4" /> Back to Exercises
          </Link>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title font-display text-3xl tracking-wider mb-2">
                NEW EXERCISE
              </h2>
              <p className="text-base-content/50 text-sm mb-4">
                Fill in the details to add an exercise to your library
              </p>
              <ExerciseForm
                onSubmit={handleSubmit}
                loading={loading}
                submitLabel="Create Exercise"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
