const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
          <div className={`flex items-end gap-3 max-w-[70%] ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
            {/* Avatar skeleton */}
            <div className="relative flex-shrink-0">
              <div className="skeleton size-10 rounded-full border-2 border-white/50"></div>
            </div>

            {/* Message Content skeleton */}
            <div className={`flex flex-col ${idx % 2 === 0 ? "items-start" : "items-end"}`}>
              {/* Message Bubble skeleton */}
              <div className={`relative ${
                idx % 2 === 0 
                  ? "bg-white/80 backdrop-blur-sm border border-white/20" 
                  : "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30"
              } rounded-2xl px-4 py-3 shadow-premium max-w-full`}>
                <div className="skeleton h-16 w-[200px] rounded-xl"></div>
              </div>

              {/* Timestamp skeleton */}
              <div className={`flex items-center gap-2 mt-2 ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <div className="skeleton h-3 w-16 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
