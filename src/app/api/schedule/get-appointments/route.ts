import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const userId = searchParams.get('userId');
    const dateParam = searchParams.get('date');

    if(!userId || userId === "null" || !dateParam || dateParam === "null"){
        return NextResponse.json({
            error: "Not Found"
        }, {
            status: 400
        });
    }

    try{
        const [year, month, day] = dateParam.split('-').map(Number);
        const startDate = new Date(year, month - 1, day, 0, 0, 0);
        const endDate = new Date(year, month - 1, day, 23, 59, 59, 999);

         return NextResponse.json({
            ok: true
        });

    }catch(err){
        return NextResponse.json({
            error: "Not Found"
        }, {
            status: 400
        });
    }
}