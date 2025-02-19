import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const GET = async(req:Request)=>{
    const {userId} = await auth()
    console.log(userId + 'is the user')
    return NextResponse.json({
        message : "Hellow World"
    })
}