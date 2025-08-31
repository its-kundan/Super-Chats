import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Palette, Sparkles, Crown } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen pt-24 px-4 pb-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-premium">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-lg opacity-40"></div>
                  <div className="relative size-12 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <Palette className="size-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Settings
                  </h1>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Premium Experience</span>
                    <Crown className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Section */}
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-base-content">Theme Customization</h2>
                <p className="text-base-content/70">Choose a theme for your premium chat interface</p>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    className={`
                      group flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 hover:scale-105
                      ${theme === t 
                        ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 shadow-lg" 
                        : "bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white/60"
                      }
                    `}
                    onClick={() => setTheme(t)}
                  >
                    <div className="relative h-10 w-full rounded-xl overflow-hidden shadow-md" data-theme={t}>
                      <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                        <div className="rounded bg-primary"></div>
                        <div className="rounded bg-secondary"></div>
                        <div className="rounded bg-accent"></div>
                        <div className="rounded bg-neutral"></div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold truncate w-full text-center">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                    {theme === t && (
                      <div className="absolute -top-1 -right-1 size-4 bg-success rounded-full border-2 border-white flex items-center justify-center">
                        <div className="size-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-base-content">Live Preview</h3>
              <div className="rounded-2xl border border-white/20 overflow-hidden bg-white/40 backdrop-blur-sm shadow-premium">
                <div className="p-6 bg-gradient-to-br from-white/60 to-white/40">
                  <div className="max-w-lg mx-auto">
                    {/* Mock Chat UI */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-premium overflow-hidden border border-white/20">
                      {/* Chat Header */}
                      <div className="px-6 py-4 border-b border-white/20 bg-white/60 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full blur-md bg-primary/40"></div>
                            <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
                              J
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-base-content">John Doe</h3>
                            <div className="flex items-center gap-2">
                              <div className="size-2 bg-success rounded-full"></div>
                              <p className="text-sm text-success font-medium">Online</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Chat Messages */}
                      <div className="p-6 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-gradient-to-br from-white/40 to-white/20">
                        {PREVIEW_MESSAGES.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`flex items-end gap-3 max-w-[70%] ${message.isSent ? "flex-row-reverse" : "flex-row"}`}>
                              {/* Avatar */}
                              <div className="relative flex-shrink-0">
                                <div className="skeleton size-8 rounded-full border border-white/50"></div>
                              </div>

                              {/* Message */}
                              <div className={`flex flex-col ${message.isSent ? "items-end" : "items-start"}`}>
                                <div className={`relative ${
                                  message.isSent 
                                    ? "bg-gradient-to-r from-primary to-secondary text-white" 
                                    : "bg-white/80 backdrop-blur-sm border border-white/20 text-base-content"
                                } rounded-2xl px-4 py-3 shadow-premium max-w-full`}>
                                  <p className="text-sm">{message.content}</p>
                                </div>
                                <div className={`flex items-center gap-2 mt-2 ${message.isSent ? "justify-end" : "justify-start"}`}>
                                  <time className="text-xs text-base-content/50 font-medium">
                                    12:00 PM
                                  </time>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chat Input */}
                      <div className="p-6 border-t border-white/20 bg-white/60 backdrop-blur-sm">
                        <div className="flex gap-3">
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              className="w-full p-4 pr-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/30 
                              focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300
                              placeholder:text-base-content/50 text-sm"
                              placeholder="Type a message..."
                              value="This is a preview"
                              readOnly
                            />
                          </div>
                          <button className="p-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white shadow-premium hover:shadow-glow transition-all duration-300 hover:scale-105">
                            <Send className="size-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
