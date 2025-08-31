import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Sparkles, Crown } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-premium group-hover:shadow-glow transition-all duration-500">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">Premium Experience</span>
                  <Crown className="w-4 h-4 text-accent" />
                </div>
                <p className="text-base-content/60">Sign in to your NexusChat account</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-premium">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">Email Address</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/30 
                    focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300
                    placeholder:text-base-content/50"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">Password</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/30 
                    focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300
                    placeholder:text-base-content/50"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-base-content/40 hover:text-base-content/60" />
                    ) : (
                      <Eye className="h-5 w-5 text-base-content/40 hover:text-base-content/60" />
                    )}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold 
                shadow-premium hover:shadow-glow transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Sign in to NexusChat"
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-base-content/60">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-primary font-semibold hover:underline transition-all duration-300">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};
export default LoginPage;
