import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import ExerciseForm from "../components/ExerciseForm.jsx";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const EditPage = () => {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const res = await api.get(`/${id}`);
        setExercise(res.data);
      } catch (error) {
        console.error("Error fetching exercise", error);
        toast.error("Failed to fetch exercise");
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [id]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await api.put(`/${id}`, data);
      toast.success("Exercise updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating exercise", error);
      toast.error(error?.response?.data?.message || "Failed to update exercise");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/${id}`);
      toast.success("Exercise deleted");
      navigate("/");
    } catch {
      toast.error("Failed to delete exercise");
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <p className="text-base-content/50">Exercise not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-4" /> Back
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-error btn-outline btn-sm"
            >
              <Trash2Icon className="size-4" /> Delete
            </button>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title font-display text-3xl tracking-wider mb-2">
                EDIT EXERCISE
              </h2>
              <p className="text-base-content/50 text-sm mb-4">
                Update the details for{" "}
                <span className="text-primary font-medium">{exercise.exerciseName}</span>
              </p>
              <ExerciseForm
                initial={exercise}
                onSubmit={handleSubmit}
                loading={saving}
                submitLabel="Save Changes"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2Icon className="size-5" /> Delete Exercise
            </h3>
            <p className="py-4 text-base-content/70">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-base-content">
                "{exercise.exerciseName}"
              </span>
              ? This action cannot be undone.
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
                {deleting ? <span className="loading loading-spinner loading-sm" /> : <Trash2Icon className="size-4" />}
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default EditPage;
