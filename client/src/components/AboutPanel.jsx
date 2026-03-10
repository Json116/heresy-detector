import { useState } from 'react'

export default function AboutPanel() {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-slate-700/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-left text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600"
        aria-expanded={open}
      >
        <span className="font-medium">About Heresy Detector</span>
        <span className="text-lg leading-none transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▾
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-2 text-sm text-slate-400 leading-relaxed space-y-3 border-t border-slate-700/50">
          <p>
            Heresy Detector analyzes theological statements against a database of{' '}
            <strong className="text-slate-300">37 Christian heresies</strong> spanning
            20 centuries of Church councils, synods, and theological debates.
          </p>
          <p>
            Verdicts are assessed across three major Christian traditions:{' '}
            <strong className="text-slate-300">Roman Catholic</strong>,{' '}
            <strong className="text-slate-300">Eastern Orthodox</strong>, and{' '}
            <strong className="text-slate-300">Protestant</strong>. A statement may be
            heresy in one tradition and disputed or even orthodox in another.
          </p>
          <p>
            <strong className="text-slate-300">Verdicts:</strong>
          </p>
          <ul className="space-y-1 pl-4 list-disc">
            <li><span className="text-red-400 font-semibold">Heresy</span> — condemned by at least one major tradition</li>
            <li><span className="text-amber-400 font-semibold">Caution</span> — disputed or contested across traditions</li>
            <li><span className="text-green-400 font-semibold">Orthodox</span> — within the mainstream of historic Christian teaching</li>
          </ul>
          <p className="text-slate-500 text-xs pt-1">
            This tool is for educational purposes only. It does not substitute for
            consultation with a qualified theologian or your local church community.
          </p>
        </div>
      )}
    </div>
  )
}
