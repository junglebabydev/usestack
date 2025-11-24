import { NextResponse } from 'next/server'
export async function GET(request){
    try{
         const url = await request.json();
         if(!url){
            return NextResponse.json({error: "Tool URL is Required"}, {status: 400});
         }

    }catch(err){
       return NextResponse.json({error: err.message}, {status: 500});
    }
}