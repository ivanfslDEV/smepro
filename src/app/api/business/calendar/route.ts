import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export type AppointmentWithService = Awaited<
  ReturnType<typeof prisma.appointment.findMany>
>[number] & { service: NonNullable<unknown> };

export const GET = auth(async function GET(request) {
  if(!request.auth){
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  
  const searchParams = request.nextUrl.searchParams;
  const dateString = searchParams.get("date") as string;
  const businessId = request.auth?.user?.id;

  if(!dateString){
    return NextResponse.json({error: "Date not informed!"}, {status: 400});
  }

  if(!businessId){
    return NextResponse.json({error: "User Not Found"}, {status: 400});
  }

  try{
    const [year, month, day] = dateString.split('-').map(Number);

    const startDate = new Date(year, month -1, day, 0, 0, 0, 0);
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999);

    const appointments = await prisma.appointment.findMany({
        where:{
            userId: businessId,
            appointmentDate:{
                gte: startDate,
                lte: endDate
            }
        },
        include:{
            service: true
        }
    })

    return NextResponse.json<AppointmentWithService[]>(appointments, { status: 200 });
  }catch(err){
    return NextResponse.json({error: "Something went wrong. Please try again later."}, {status: 400});
  }

})