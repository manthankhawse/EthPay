"'use client'"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowUpRight, ArrowDownLeft, ExternalLink, Menu, Search, Package2, CircleUser } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Logo from "@/components/ui/Logo"
import SendEth from "@/components/SendEth"
import Link from "next/link"


export default function Page() {
  const userProfile = {
    name: "Alex Johnson",
    username: "alexj",
    avatarUrl: "https://i.pravatar.cc/150?u=alexj",
    joinDate: "May 2021",
    transactionCount: 1287,
    reputation: 4.9,
    bio: "Blockchain enthusiast and early Ethereum adopter. Building the future of decentralized finance.",
    walletAddress: "0x1234...5678",
  }

  const transactions = [
    { id: 1, type: "'Received'", amount: "'0.5 ETH'", from: "'0xabcd...efgh'", date: "'2023-06-15'" },
    { id: 2, type: "'Sent'", amount: "'0.1 ETH'", to: "'0x9876...5432'", date: "'2023-06-14'" },
    { id: 3, type: "'Received'", amount: "'1.0 ETH'", from: "'0x2468...1357'", date: "'2023-06-13'" },
    { id: 4, type: "'Sent'", amount: "'0.3 ETH'", to: "'0x1357...2468'", date: "'2023-06-12'" },
  ]

  return (
    <>
    <header className="top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo/>
          </Link>
          <SendEth/>
          
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 bg-neutral-900 text-white border-none">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{userProfile.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-2">@{userProfile.username}</p>
              <p className="text-sm mb-4">{userProfile.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                <Badge variant="secondary">
                  <Clock className="w-4 h-4 mr-1" />
                  Joined {userProfile.joinDate}
                </Badge>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Wallet: {userProfile.walletAddress}
              </p>
              <div className="flex justify-center md:justify-start space-x-2">
                <SendEth/>
                <Button variant="default" className="shadow-xl">
                  View on Etherscan
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900 text-white border-none">
        <CardHeader>
          <CardTitle>Public Transaction History</CardTitle>
          <CardDescription>Recent public Ethereum transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-3">
                  {transaction.type === "'Received'" ? (
                    <ArrowDownLeft className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-semibold">{transaction.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.type === "'Received'" ? `From: ${transaction.from}` : `To: ${transaction.to}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{transaction.amount}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  )
}