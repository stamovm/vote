import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // if (req.cookies['poll-token']) return

  const random = nanoid()

  const res = NextResponse.next() //.redirect(req.nextUrl)

  // res.cookie('poll-token', random, { sameSite: 'strict' })
  // setCookie('poll-token', '-------------------------')
  // setCookie('server-key', 'value', { sameSite: 'strict' })

  console.log('cookiee')
  return res
}
