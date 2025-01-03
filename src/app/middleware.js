import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;
    const cookie = req.cookies.get('user');

    if (
            // !cookie && pathname !== '/' &&
            !cookie &&
            !pathname.startsWith('/sellers/register')
        ) {
        const url = req.nextUrl.clone();
        url.pathname = '/sellers/register';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
};
