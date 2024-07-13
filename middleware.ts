import { NextRequest, NextResponse } from "next/server";

export function middleware (request:NextRequest) {
    const url = request.nextUrl.clone();

    let isLogin = request.cookies.get('logged');
 


    if(!isLogin) {
        if(request.nextUrl.pathname.startsWith("/admin")){
            return NextResponse.rewrite(new URL("/" , request.url))
        }
        if(request.nextUrl.pathname.startsWith("/index")){
          return NextResponse.rewrite(new URL("/" , request.url))
      }
       else if(request.nextUrl.pathname.startsWith("/profile")){
          return NextResponse.rewrite(new URL("/" , request.url))
        }
    
     else   if(request.nextUrl.pathname.startsWith("/share")){
          return NextResponse.rewrite(new URL("/" , request.url))
        }
    
     else   if(request.nextUrl.pathname.startsWith("/archives")){
          return NextResponse.rewrite(new URL("/" , request.url))
        }

     else   if(request.nextUrl.pathname.startsWith("/addarchives")){
          return NextResponse.rewrite(new URL("/" , request.url))
        }

     else   if(request.nextUrl.pathname.startsWith("/sonograph")){
          return NextResponse.rewrite(new URL("/" , request.url))
        }

        else   if(request.nextUrl.pathname.startsWith("/myarchive")){
            return NextResponse.rewrite(new URL("/" , request.url))
          }

          else if(request.nextUrl.pathname.startsWith("/mobile/connect")){
            return NextResponse.rewrite(new URL("/" , request.url))
          }

          else if(request.nextUrl.pathname.startsWith("/archives")){
            return NextResponse.rewrite(new URL("/" , request.url))
          }

          else if(request.nextUrl.pathname.startsWith("/share/shareMe")){
            return NextResponse.rewrite(new URL("/" , request.url))
          }

          else if(request.nextUrl.pathname.startsWith("/notfound")){
            return NextResponse.rewrite(new URL("/" , request.url))
          }

          else if(request.nextUrl.pathname.startsWith("/locales/en.json")){
            return NextResponse.rewrite(new URL("/" , request.url))
          }
    }

   

    else{
        if(url.pathname === "/"){
            url.pathname = "/admin";
            return NextResponse.redirect(url);
        }
    }

    if(request.nextUrl.pathname.startsWith('/index')){
        return NextResponse.rewrite(new URL('/' , request.url))
    }

    if(request.nextUrl.pathname.startsWith('/admin'))
    return NextResponse.rewrite(new URL('/admin' , request.url))
}