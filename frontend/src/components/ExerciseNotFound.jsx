import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

const ExerciseNotFound = ({ message = "No exercises found" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="bg-base-200 rounded-full p-6">
        <Dumbbell className="size-10 text-base-content/30" />
      </div>
      <div>
        <p className="text-xl font-semibold text-base-content/60">{message}</p>
        <p className="text-sm text-base-content/40 mt-1">
          Start by adding your first exercise
        </p>
      </div>
      <Link to="/create" className="btn btn-primary btn-sm mt-2">
        Add Exercise
      </Link>
    </div>
  );
};

export default ExerciseNotFound;
