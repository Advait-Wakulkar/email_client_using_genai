import { db } from "./server/db";

await db.user.create({
    data : {
        emailAddress : "test@gmail.com",
        firstName : "Advait",
        lastName : "Advait"
    }
})

console.log("done")