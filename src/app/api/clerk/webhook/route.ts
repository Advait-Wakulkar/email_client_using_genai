// /api/clerk/webhook

import { db } from "@/server/db"

export const POST = async (req : Request)=>{
    const {data} = await req.json()
    console.log("clerk webhook received", data)
    const emailAddress = data.email_addresses[0].email_address
    const firstName = data.first_name
    const lastName = data.last_name
    const imageUrl = data.image_url
    const id = data.id

    const db_req = await db.user.create({
        data : {
            id : id,
            emailAddress : emailAddress,
            firstName : firstName,
            lastName : lastName,
            imageUrl : imageUrl
        }
    })

    if (db_req){
        return new Response("User Created", {status : 200})
    }else{
        return new Response ("Unable to create User")
    }
}