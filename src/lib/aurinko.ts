"use server"

import { auth } from "@clerk/nextjs/server"

export const getAurinkoAuthUrl = async (serviceType : "Google" | "Office365")=>{
    const {userId} = await auth()
    if (!userId) throw new Error("Unauthorized")

        const params = new URLSearchParams({
            clientId : process.env.AURINKO_CLIENT_ID as string,
            serviceType,
            access_type : "offline",
            scopes : "Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All",
            responseType : "code",
            redirect_uri : `${process.env.NEXT_PUBLIC_URL}`
        })

        console.log(params.toString())

    return `https://api.aurinko.io/v1/authorize?${params.toString()}`
}
