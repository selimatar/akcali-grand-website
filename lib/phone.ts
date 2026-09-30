// Turkish phone numbers as typed by editors: "0532 123 45 67", "+90 (532) 123 45 67", "(0326) 123 45 67"…

/** The 10-digit national number, or null if the value isn't a valid Turkish number. */
export function nationalNumber(value: string): string | null {
  const digits = value.replace(/\D/g, '')
  const national = digits.startsWith('90')
    ? digits.slice(2)
    : digits.startsWith('0')
      ? digits.slice(1)
      : digits
  return /^[2-5]\d{9}$/.test(national) ? national : null
}

export function isTurkishPhone(value: string): boolean {
  return nationalNumber(value) !== null
}

/** `tel:+90…` link for a valid number, otherwise null (the number is then shown without a link). */
export function telHref(value: string | null | undefined): string | null {
  const national = value ? nationalNumber(value) : null
  return national ? `tel:+90${national}` : null
}
