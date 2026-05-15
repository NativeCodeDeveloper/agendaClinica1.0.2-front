




/*

// frontend/src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

// Middleware sin lógica — solo deja pasar todo
export default function middleware(_req: NextRequest) {
return NextResponse.next()
}

// (Opcional) Indica en qué rutas se ejecuta
export const config = {
matcher: ['/dashboard/:path*'], // o simplemente [] si quieres que no aplique a ninguna
}


*/






import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { canAccessDashboardPath } from '@/lib/dashboard-access'

const isDashboard = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!isDashboard(req)) return NextResponse.next()

  const { userId, sessionClaims } = await auth()

  // No autenticado → sign-in
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // Leer rol desde publicMetadata (configurado en Clerk Dashboard)
  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role

  if (!canAccessDashboardPath(role, req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard/no-access', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*'],
}


