import { X, Wifi, WifiOff, Crown } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-6 border-b border-white/20 bg-white/40 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className={`absolute inset-0 rounded-full blur-md transition-opacity ${
              onlineUsers.includes(selectedUser._id) ? 'bg-success/40' : 'bg-base-content/20'
            }`}></div>
            <img 
              src={selectedUser.profilePic || "/avatar.png"} 
              alt={selectedUser.fullName}
              className="relative size-12 object-cover rounded-full border-2 border-white/50 shadow-md"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <div className="absolute -bottom-1 -right-1 size-4 bg-success rounded-full border-2 border-white flex items-center justify-center">
                <div className="size-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>

          {/* User info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-base-content">{selectedUser.fullName}</h3>
              {selectedUser.isPremium && (
                <Crown className="size-5 text-accent" />
              )}
            </div>
            <div className="flex items-center gap-2">
              {onlineUsers.includes(selectedUser._id) ? (
                <>
                  <Wifi className="size-4 text-success" />
                  <span className="text-sm text-success font-medium">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="size-4 text-base-content/40" />
                  <span className="text-sm text-base-content/40">Offline</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="group p-2 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <X className="size-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
