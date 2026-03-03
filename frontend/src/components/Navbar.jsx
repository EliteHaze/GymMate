import { Link, useLocation } from "react-router-dom";
import { PlusIcon, ClockIcon, DumbbellIcon, HomeIcon } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="bg-base-100 border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1.5">
              <DumbbellIcon className="size-5 text-primary-content" />
            </div>
            <h1 className="text-2xl font-display tracking-wider text-primary">
             GYMMATE
            </h1>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className={`btn btn-sm ${
                location.pathname === "/" ? "btn-primary" : "btn-ghost"
              }`}
            >
              <HomeIcon className="size-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/suggest"
              className={`btn btn-sm ${
                location.pathname === "/suggest" ? "btn-primary" : "btn-ghost"
              }`}
            >
              <ClockIcon className="size-4" />
              <span className="hidden sm:inline">By Time</span>
            </Link>
            <Link
              to="/create"
              className={`btn btn-sm ${
                location.pathname === "/create" ? "btn-primary" : "btn-primary btn-outline"
              }`}
            >
              <PlusIcon className="size-4" />
              <span className="hidden sm:inline">Add Exercise</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;