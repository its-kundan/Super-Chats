import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Sparkles } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed w-full top-0 z-40">
      <div className="container mx-auto px-4 h-20">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="group flex items-center gap-3 hover:scale-105 transition-all duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative size-12 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-premium group-hover:shadow-glow transition-all duration-300">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  NexusChat
                </h1>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span className="text-xs text-base-content/60 font-medium">Premium</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Section */}
          <div className="flex items-center gap-3">
            <Link
              to={"/settings"}
              className="group relative px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span className="hidden sm:inline font-medium">Settings</span>
              </div>
            </Link>

            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className="group relative px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-2">
                    <User className="size-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="hidden sm:inline font-medium">Profile</span>
                  </div>
                </Link>

                <button 
                  className="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-md border border-accent/30 hover:from-accent/30 hover:to-primary/30 transition-all duration-300 hover:scale-105"
                  onClick={logout}
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="size-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="hidden sm:inline font-medium">Logout</span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
