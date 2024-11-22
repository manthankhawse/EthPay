"use client"
import Link from "next/link"
import {
  MoreHorizontal,
  Package2,
  Search,
  Menu,
  CircleUser
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Logo from "@/components/ui/Logo"
import SendEth from "@/components/SendEth"
import { Footer } from "@/components/dark-mode-footer-with-contact"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import abi from "@/build/contracts/TransferEther.json"

const CONTRACT_ADDRESS=process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = abi.abi;

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions."

export default function Dashboard() {

  const [walletAddress, setWalletAddress] = useState("");
  const [history, setHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const _walletAddress = await signer.getAddress();
        setWalletAddress(_walletAddress);

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

        const transactionsProxy = await contract.getTransactions();
        const transactions = Array.from(transactionsProxy);

        const historyData = transactions.map((tx, index) => ({
          id: index,
          from: tx["0"],
          to: tx["1"],
          amount: ethers.formatEther(tx["2"]),
          flag: Number(tx["3"]),
          date: new Date(Number(tx["4"]) * 1000).toLocaleString(),
        }));

        console.log(historyData);
        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        if (error.message.includes("admin")) {
          setErrorMessage("You are not an admin.");
        }
      }
    };

    getAllTransactions();
  }, []);


  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <header className="top-0 flex h-16 items-center gap-4 border-b border-zinc-200 shadow-md px-4 md:px-6 ">
        <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo/>
          </Link>
          <SendEth />
          
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
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] border-black"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full border-2 border-grey-900 shadow-md">
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
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-2xl font-semibold text-white">Transaction History</h1>
          <p className="text-red-600">{errorMessage===""? "": errorMessage}</p>
        </header>
        <main className="grid flex-1 items-start mr-6 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList className=" bg-white text-black">
                <TabsTrigger value="all" className="font-semibold">All</TabsTrigger>
                <TabsTrigger value="active" className="text-green-500 font-semibold">Successful</TabsTrigger>
                <TabsTrigger value="draft" className="text-red-500 font-semibold">Flagged</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0" className="bg-white text-black">
                <CardHeader>
                  <CardTitle className="text-xl">Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-black text-lg">Sender</TableHead>
                        <TableHead className="text-black text-lg">Reciever</TableHead>
                        <TableHead className="text-black text-lg">Amount</TableHead>
                        <TableHead className="text-black text-lg">Flag</TableHead>
                        <TableHead className="text-black text-lg">
                          Created at
                        </TableHead>
                        <TableHead className="text-black text-lg">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {history.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.from}</TableCell>
                          <TableCell>{transaction.to}</TableCell>
                          <TableCell>{transaction.amount} ETH</TableCell>
                          <TableCell>{transaction.flag ? "Flagged" : "Normal"}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Train</DropdownMenuItem>
                              <DropdownMenuItem>Block</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <Footer/>
    </div>
  )
}
