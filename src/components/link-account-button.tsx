"use client"

import { getAurinkoAuthorizationUrl } from "@/lib/aurinko";
import { Button } from "./ui/button";

export function Link_Account_Button() {
  return (
    <Button onClick={async ()=>{
        const authUrl = await getAurinkoAuthorizationUrl('Google')
        window.location.href = authUrl
        console.log(authUrl)
    }}>Link Account</Button>
  );
}