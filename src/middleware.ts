import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('fgkt')?.value;
    const { pathname } = request.nextUrl;

    // Allow access to auth routes
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    // Protect routes under /(protected)
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Verify token and role for admin routes
        // if (pathname.startsWith('/admin')) {
        //     try {
        //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
        //             headers: {
        //                 Cookie: `fgkt=${token}`,
        //             },
        //             credentials: 'include',
        //         });

        //         if (!response.ok) {
        //             throw new Error('Failed to verify token');
        //         }

        //         const user = await response.json();
        //         if (!user || user.role !== 'admin') {
        //             return NextResponse.redirect(new URL('/dashboard', request.url));
        //         }
        //     } catch (error) {
        //         console.error('Token verification failed:', error);
        //         return NextResponse.redirect(new URL('/login', request.url));
        //     }
        // }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};