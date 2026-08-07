import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from './lib/auth'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session){
        return NextResponse.redirect(new URL('/signin', request.url))
    }
    return NextResponse.next();

}
 
export const config = {
  matcher: ['/add-properties','/all-properties','/all-properties/:path*','/dashboard','/dashboard/:path*'],
}