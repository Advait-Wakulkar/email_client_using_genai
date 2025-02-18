import { db } from "@/server/db";

export const POST = async (req: Request) => {
    try {
        const { data } = await req.json();
        console.log("Clerk webhook received", data);

        if (!data || !data.id || !data.email_addresses) {
            console.error("Invalid payload received", data);
            return new Response("Invalid data", { status: 400 });
        }

        const emailAddress = data.email_addresses[0]?.email_address;
        const firstName = data.first_name || "";
        const lastName = data.last_name || "";
        const imageUrl = data.image_url || "";

        const db_req = await db.user.create({
            data: {
                id: data.id,
                emailAddress,
                firstName,
                lastName,
                imageUrl,
            },
        });

        console.log("User created:", db_req);
        return new Response("User Created", { status: 200 });
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
    }
};
