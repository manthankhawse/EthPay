"use client";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ethers } from "ethers";
import { Footer } from "@/components/dark-mode-footer-with-contact";
import Logo from "@/components/ui/Logo";
import SendEth from "@/components/SendEth";
import { useEffect, useState } from "react";
import abi from "@/build/contracts/TransferEther.json";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = abi.abi;

export const description =
  "An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image. The main content area is divided into two rows. The first row has a grid of cards with statistics. The second row has a grid of cards with a table of recent transactions and a list of recent sales.";

export default function Page() {
  const [balance, setBalance] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [history, setHistory] = useState([]);
  const [flagged, setFlagged] = useState(0);
  const [amountSaved, setAmountSaved] = useState(0);
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    const getWalletAndHistory = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const _walletAddress = await signer.getAddress();
        setWalletAddress(_walletAddress);

        // Fetch wallet balance
        const balance = await provider.getBalance(_walletAddress);
        setBalance(ethers.formatEther(balance));

        // Fetch transaction history from the contract
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );
        const transactionsProxy = await contract.getWalletTransactions(
          _walletAddress
        );
        const transactions = Array.from(transactionsProxy);

        const historyData = transactions.map((tx, index) => ({
          id: index,
          from: tx["0"],
          to: tx["1"],
          amount: ethers.formatEther(tx["2"]),
          flag: Number(tx["3"]), // Convert BigInt flag to boolean if applicable
          date: new Date(Number(tx["4"]) * 1000).toLocaleString(), // Convert BigInt timestamp to number
        }));

        // setHistory(historyData);
        let flags = 0;
        let amount = 0;
        for (const tx of historyData) {
          if (tx.flag === 1) {
            flags++;
            amount += Number(tx.amount);
          }
        }

        console.log(flags);
        console.log(amount);

        setHistory(historyData);
        setFlagged(flags);
        setAmountSaved(amount);
        setRecents(historyData.reverse());
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    getWalletAndHistory();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-black">
      <header className="top-0 flex h-16 items-center gap-4 border-b border-zinc-200 shadow-md px-4 md:px-6 ">
        <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo />
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
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full border-2 border-grey-900 shadow-md"
              >
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
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card
            x-chunk="dashboard-01-chunk-0"
            className="bg-blue-500 text-white shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{balance} ETH</div>
            </CardContent>
          </Card>
          <Card
            x-chunk="dashboard-01-chunk-0"
            className="bg-green-500 text-white shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Amount Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{amountSaved} ETH</div>
            </CardContent>
          </Card>
          <Card
            x-chunk="dashboard-01-chunk-0"
            className="bg-yellow-500 text-white shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Total Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{history.length}</div>
            </CardContent>
          </Card>
          <Card
            x-chunk="dashboard-01-chunk-0"
            className="bg-red-500 text-white shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Flagged Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{flagged}</div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card
            className="xl:col-span-1 bg-white border-none text-black w-full shadow-xl border-gray-900"
            x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle className="text-2xl">Transactions</CardTitle>
                <CardDescription className="text-lg">
                  Recent transactions from your wallets.
                </CardDescription>
              </div>
              <Button asChild size="lg" className="ml-auto gap-1">
                <Link href="#" className="font-semibold">
                  View All
                  <ArrowUpRight className="h-4 w-4 font-semibold" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="w-full">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-lg  text-center">
                      User
                    </TableHead>
                    <TableHead className=" font-semibold text-lg text-center">
                      Flag
                    </TableHead>
                    <TableHead className="font-semibold text-lg  text-center">
                      Date
                    </TableHead>
                    <TableHead className="font-semibold text-lg  text-center">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recents.map((transaction) => {
                    const isSender = transaction.from === walletAddress;
                    const textColor = isSender
                      ? "text-red-500"
                      : "text-green-500";

                    return (
                      <TableRow
                        key={transaction.id}
                        className={`text-xl font-bold ${textColor}`}
                      >
                        <TableCell>
                          <div className={`text-xl font-bold ${textColor}`}>
                            {isSender ? transaction.to : transaction.from}
                          </div>
                        </TableCell>
                        <TableCell className="text-xl text-center">
                          {transaction.flag}
                        </TableCell>
                        <TableCell className="text-xl text-center">
                          {transaction.date}
                        </TableCell>
                        <TableCell className="text-center">
                          {transaction.amount} ETH
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
