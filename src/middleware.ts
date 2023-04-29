import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/*
*   Middleware para controlar nível de acesso às rotas
*/
export async function middleware(req : NextRequest){
    const token = await getToken({req});
    
    if (req.nextUrl.pathname.startsWith('/cadevento')) {//teste middleware
        if(token?.permissao != "admin" && token?.permissao != "tecnico")
            return NextResponse.redirect(new URL('/home',req.url));
    }

}