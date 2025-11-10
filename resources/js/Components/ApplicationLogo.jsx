export default function ApplicationLogo(props) {
  return (
    <div className="flex items-center gap-2" {...props}>
      {/* ikon lingkaran checklist */}
      <div className="h-9 w-9 rounded-2xl bg-slate-900 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>

      {/* tulisan brand */}
      <div className="leading-tight">
        <p className="text-sm font-semibold text-slate-900">Todos Inertia</p>
        <p className="text-[10px] text-slate-400 tracking-wide">focus. track. done.</p>
      </div>
    </div>
  )
}
