"use client"

import { getAurinkoAuthUrl } from "@/lib/aurinko";
import { Button } from "./ui/button";

export function Link_Account_Button() {
  return (
    <Button onClick={async ()=>{
        const authUrl = await getAurinkoAuthUrl('Google')
        window.location.href = authUrl
        console.log(authUrl)
    }}>Link Account</Button>
  );
}