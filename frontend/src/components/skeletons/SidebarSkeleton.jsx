import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

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
            <div className="skeleton h-6 w-20 mb-2"></div>
            <div className="skeleton h-3 w-32"></div>
          </div>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-4 px-3 space-y-2">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-4 rounded-2xl flex items-center gap-4 bg-white/20 backdrop-blur-sm border border-white/10">
            {/* Avatar skeleton */}
            <div className="relative">
              <div className="skeleton size-12 rounded-full border-2 border-white/50"></div>
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1 space-y-2">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-3 w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
