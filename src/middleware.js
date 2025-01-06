import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;
    console.log('pathname', pathname);

    const cookie = req.cookies.get('user');
    console.log('cookie', cookie);

    if (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/public/') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    if (

            !cookie && pathname !== '/' &&
            !pathname.startsWith('/frontend/sellers/register') &&
            !pathname.startsWith('/frontend/users/register') &&
            !pathname.startsWith('/frontend/users/sign-in')

        ) {
        const url = req.nextUrl.clone();
        url.pathname = '/frontend/users/sign-in';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
};
