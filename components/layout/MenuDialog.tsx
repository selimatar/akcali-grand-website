'use client'

import { useId, useRef, useState, type ReactNode } from 'react'

import { ui } from '@/lib/ui-strings'

export type MenuItem = { id: string; number: string; label: string }

type Props = {
  items: MenuItem[]
  /** Contact line under the links (phone · Instagram), rendered on the server. */
  contact?: ReactNode
}

function MenuPill({
  label,
  className = '',
  ...props
}: { label: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      data-surface="dark"
      className={`fixed top-4 right-4 z-50 flex h-pill w-32 cursor-pointer items-center gap-3 rounded-pill border border-on-dark-outline glass px-5 text-label tracking-button text-ivory uppercase ${className}`}
      {...props}
    >
      <span>{label}</span>
      <span aria-hidden="true" className="flex flex-col gap-1.25">
        <span className="block h-px w-4.5 bg-gold" />
        <span className="ml-1.5 block h-px w-3 bg-ivory" />
      </span>
    </button>
  )
}

/**
 * The floating "Menü" pill and the full-screen menu from the design. Uses a native modal <dialog>:
 * the browser traps focus, makes the page behind it inert, closes on Esc and returns focus to the
 * pill. A second pill inside the dialog ("Kapat") sits exactly on top of the first, so visually it
 * is a single toggle.
 */
export function MenuDialog({ items, contact }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const dialogId = useId()

  const openMenu = () => {
    dialogRef.current?.showModal()
    setOpen(true)
  }
  const closeMenu = () => dialogRef.current?.close()

  // Closing a modal dialog returns focus to the pill; move it to the chosen section instead so the
  // next Tab continues from there. The link's own navigation handles the (smooth) scroll.
  const goToSection = (id: string) => {
    closeMenu()
    requestAnimationFrame(() => {
      const target = document.getElementById(id)
      if (!target) return
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    })
  }

  return (
    <>
      <MenuPill
        label={ui.menu.open}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={openMenu}
      />

      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-label={ui.menu.dialogLabel}
        data-surface="dark"
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-night p-0 text-ivory opacity-0 transition-[opacity,display,overlay] transition-discrete duration-300 ease-out-soft backdrop:bg-night open:opacity-100 starting:open:opacity-0"
      >
        <MenuPill label={ui.menu.close} autoFocus onClick={closeMenu} />

        <div className="flex min-h-full flex-col justify-center px-menu-x pt-24 pb-12">
          <nav aria-label={ui.menu.navLabel}>
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={() => goToSection(item.id)}
                    className="flex items-baseline gap-4 font-display text-menu text-ivory no-underline hover:text-gold"
                  >
                    <span
                      aria-hidden="true"
                      className="font-sans text-label tracking-num text-gold"
                    >
                      {item.number}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {contact ? (
            <p className="mt-12 text-small leading-auto tracking-meta text-on-dark-soft">
              {contact}
            </p>
          ) : null}
        </div>
      </dialog>
    </>
  )
}
