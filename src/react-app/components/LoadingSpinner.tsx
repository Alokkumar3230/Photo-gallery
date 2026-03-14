export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-rose-500 rounded-full 
                        animate-spin border-t-transparent"></div>
      </div>
      <p className="mt-6 text-slate-500 font-medium animate-pulse">Loading photos...</p>
    </div>
  );
}
