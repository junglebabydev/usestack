import { NextResponse } from 'next/server';
import { parseToolData} from '@/lib/aiParser';
export async function POST(request){
    try{
         const {url} = await request.json();
         if(!url){
            return NextResponse.json({error: "Tool URL is Required"}, {status: 400});
         }
          const parsed = await parseToolData(url);
          return NextResponse.json(parsed);

    }catch(err){
       return NextResponse.json({error: err.message}, {status: 500});
    }
}