import { ui } from '@/lib/ui-strings'

/** "Keşfedin" link at the bottom of the hero with the design's animated gold line. */
export function ScrollCue({ targetId }: { targetId: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-ivory no-underline"
    >
      <span className="optical-center-cue text-micro tracking-cue uppercase">
        {ui.hero.scrollCue}
      </span>
      <span
        aria-hidden="true"
        className="relative block h-12 w-px overflow-hidden bg-on-dark-track"
      >
        {/* Reduced motion: no loop, the gold line simply stays drawn. */}
        <span className="absolute inset-0 animate-cue bg-gold motion-reduce:animate-none" />
      </span>
    </a>
  )
}
