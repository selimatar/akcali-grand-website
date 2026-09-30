import { draftMode } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

/** Leaves draft preview ("Önizlemeden çık") and returns to the published homepage. */
export async function GET(request: NextRequest) {
  ;(await draftMode()).disable()
  return NextResponse.redirect(new URL('/', request.url))
}
