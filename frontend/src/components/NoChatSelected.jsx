import { MessageSquare, Sparkles, Users, Zap } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm">
      <div className="max-w-2xl text-center space-y-8">
        {/* Premium Icon Display */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-premium group-hover:shadow-glow transition-all duration-500 animate-float">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to NexusChat
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-lg font-semibold text-accent">Premium Experience</span>
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <p className="text-lg text-base-content/70 max-w-md mx-auto">
            Select a conversation from the sidebar to start your premium messaging experience
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="group p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-base-content mb-2">Real-time Chat</h3>
            <p className="text-sm text-base-content/60">Instant messaging with live updates</p>
          </div>

          <div className="group p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-base-content mb-2">Smart Contacts</h3>
            <p className="text-sm text-base-content/60">Organized and intelligent contact management</p>
          </div>

          <div className="group p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-secondary/20 to-accent/20 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-base-content mb-2">Premium Features</h3>
            <p className="text-sm text-base-content/60">Advanced messaging capabilities</p>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="mt-8">
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-premium hover:shadow-glow transition-all duration-300 hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
