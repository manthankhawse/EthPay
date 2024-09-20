"'use client'"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Star, Clock, ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react"

export function PublicProfilePage() {
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
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
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
                <Badge variant="secondary">
                  <Star className="w-4 h-4 mr-1" />
                  {userProfile.reputation} Reputation
                </Badge>
                <Badge variant="secondary">
                  <User className="w-4 h-4 mr-1" />
                  {userProfile.transactionCount} Transactions
                </Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Wallet: {userProfile.walletAddress}
              </p>
              <div className="flex justify-center md:justify-start space-x-2">
                <Button variant="outline">Send ETH</Button>
                <Button variant="outline">
                  View on Etherscan
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
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
  )
}