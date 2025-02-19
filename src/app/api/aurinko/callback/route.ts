import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const GET = async(req:Request)=>{
    const {userId} = await auth()

    if (!userId) return NextResponse.json(
        {message : 'Unauthorized'},
        {status : 401})

    return NextResponse.json({
        message : "Hello World"
    })
}