export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-3 h-3 rounded-full bg-amber-500 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="text-slate-400 italic text-sm tracking-wide">
        Consulting the councils…
      </p>
    </div>
  )
}
