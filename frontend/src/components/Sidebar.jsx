import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Wifi, WifiOff, Crown } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-24 lg:w-80 bg-white/60 backdrop-blur-md border-r border-white/20 flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="border-b border-white/20 w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-md opacity-40"></div>
            <div className="relative size-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Users className="size-5 text-white" />
            </div>
          </div>
          <div className="hidden lg:block">
            <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Contacts
            </h2>
            <p className="text-xs text-base-content/60">Manage your connections</p>
          </div>
        </div>
        
        {/* Online filter toggle */}
        <div className="hidden lg:block">
          <label className="cursor-pointer flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition-colors">
            <div className="relative">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${
                showOnlineOnly ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-base-300'
              }`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 transform ${
                  showOnlineOnly ? 'translate-x-4' : 'translate-x-1'
                } mt-1`}></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="size-4 text-success" />
              <span className="text-sm font-medium">Online only</span>
            </div>
          </label>
          <div className="flex items-center gap-2 mt-2 ml-13">
            <div className="flex items-center gap-1">
              <div className="size-2 bg-success rounded-full"></div>
              <span className="text-xs text-base-content/60">
                {onlineUsers.length - 1} online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-4 px-3 space-y-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-4 rounded-2xl flex items-center gap-4
              transition-all duration-300 group relative
              ${selectedUser?._id === user._id 
                ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 shadow-lg" 
                : "hover:bg-white/40 border border-transparent hover:border-white/20"
              }
            `}
          >
            {/* User Avatar */}
            <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-md transition-opacity ${
                onlineUsers.includes(user._id) ? 'bg-success/40' : 'bg-base-content/20'
              }`}></div>
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="relative size-12 object-cover rounded-full border-2 border-white/50 shadow-md"
              />
              {onlineUsers.includes(user._id) && (
                <div className="absolute -bottom-1 -right-1 size-4 bg-success rounded-full border-2 border-white flex items-center justify-center">
                  <div className="size-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate text-base-content">
                  {user.fullName}
                </h3>
                {user.isPremium && (
                  <Crown className="size-4 text-accent" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {onlineUsers.includes(user._id) ? (
                  <>
                    <Wifi className="size-3 text-success" />
                    <span className="text-xs text-success font-medium">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="size-3 text-base-content/40" />
                    <span className="text-xs text-base-content/40">Offline</span>
                  </>
                )}
              </div>
            </div>

            {/* Mobile indicator */}
            <div className="lg:hidden">
              {onlineUsers.includes(user._id) && (
                <div className="size-3 bg-success rounded-full border-2 border-white"></div>
              )}
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <div className="size-16 mx-auto mb-4 rounded-full bg-base-200 flex items-center justify-center">
              <Users className="size-8 text-base-content/40" />
            </div>
            <p className="text-base-content/60 font-medium">No users found</p>
            <p className="text-xs text-base-content/40 mt-1">
              {showOnlineOnly ? "No online users" : "Start connecting with people"}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
