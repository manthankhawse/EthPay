"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'."

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async ()=>{
    try {
      const res = await fetch("http://localhost:3000/api/admin/login",{
        method:"POST",
        body:JSON.stringify({
          username, 
          password
        })
      })
  
      const data = await res.json();
  
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-12">
    <p className="text-4xl font-bold">EthPay</p>
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>Sign in</Button>
      </CardFooter>
    </Card>
    </div>
  )
}
