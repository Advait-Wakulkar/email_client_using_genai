import { getAccountDetails, getAurinkoToken } from "@/lib/aurinko";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    const params = req.nextUrl.searchParams
    console.log("REQ.NEXTURL          ",req.nextUrl)
    const code = params.get('accessToken');

    console.log("Token : ", params.get('accessToken'))

    const token = await getAurinkoToken(code as string)

    if (!token) return NextResponse.json({ error: "Failed to fetch token" }, { status: 400 });
    const accountDetails = await getAccountDetails(token.accessToken)
    await db.account.upsert({
        where: { id: token.accountId.toString() },
        create: {
            id: token.accountId.toString(),
            userId,
            accessToken: token.accessToken,
            emailAddress: accountDetails.email,
            name: accountDetails.name
        },
        update: {
            accessToken: token.accessToken,
        }
    })
    return NextResponse.redirect(new URL('/', req.url))
}