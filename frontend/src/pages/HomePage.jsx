import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen pt-24 px-4 pb-4">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-7xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-3xl overflow-hidden shadow-premium bg-white/80 backdrop-blur-xl border border-white/20">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
