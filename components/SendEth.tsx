"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { ethers } from "ethers"
import { Spinner } from "./Spinner"
import abi from "@/build/contracts/TransferEther.json"
import right from "@/app/assets/check.png"
import cross from "@/app/assets/cross(1).png"
import Image from "next/image"
import fetchAddressDetails from "@/utils/fetchDetails"
import predict from "@/utils/predict"

// Replace with your deployed contract's address and ABI
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = abi.abi;

export default function SendEth() {
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentState, setCurrentState] = useState("");
  const [successful, setSuccessful] = useState(false);

  const proceedToPay = async () => {
    try {
      setLoading(true);
      setCurrentState("Connecting to MetaMask...");
  
      // Check for MetaMask installation
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed.");
      }
  
      // Request MetaMask account access
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
  
      // Create a new contract instance with the signer
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
      // Convert value from ETH to wei
      const amountInWei = ethers.parseEther(value);
      const addressDetails = await fetchAddressDetails(address);
      console.log(addressDetails);
      const pred = await predict(addressDetails);
      const flag = pred.prediction;
      // 0x87d884aaa6ff9e9b6014631b0abae80b53953fb8 not fraud
      // 0x3d020954e30c3d40b7f0c533cf198bc10dd45a49 fraud
      // const flag = 0;

      console.log(flag);
      // const flag = 0;
      // Send Ether via the contract
      setCurrentState("Sending transaction...");
      const transactionResponse = await contract.sendEther(address, amountInWei, flag, {
        value: amountInWei,
      });
  
      setCurrentState("Waiting for confirmation...");
      await transactionResponse.wait(); 
      
      if(flag===1){
        setCurrentState("Reciever fradulent");
        setSuccessful(false);
        setLoading(false);
        return;
      }
      setCurrentState("Transaction successful!");
      setSuccessful(true);
    } catch (error) {
      console.error("Payment failed:", error);
      setCurrentState("Payment Process Terminated");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="font-semibold text-md hover:bg-white hover:text-blue-500 bg-blue-500 px-4 py-2 text-white rounded-lg"
        >
          Send Eth
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  text-black border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>Send Ethereum</DialogTitle>
          <DialogDescription>
            Enter receiver address and amount (in ETH).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Address" className="text-right">
              Address
            </Label>
            <Input
              id="Address"
              value={address}
              className="col-span-3 border-black"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Amount" className="text-right">
              Amount (ETH)
            </Label>
            <Input
              id="Amount"
              value={value}
              className="col-span-3 border-black"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="font-semibold text-md border-2 bg-blue-500 text-white hover:text-blue-500 rounded-lg shadow-lg"
                onClick={proceedToPay}
              >
                Proceed To Pay
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] text-black border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle >Processing Payment</DialogTitle>
                <DialogDescription>
                  Please wait while we are processing your payment.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col justify-evenly items-center h-72 w-full">
              {loading ? <Spinner size="large" /> : successful? 
              <div>
                <Image src={right} alt="done" width={200} height={200} className="mx-auto"/>
              </div>:
              <div>
                <Image src={cross} alt="terminated" width={200} height={200} className="mx-auto"/>  
              </div>}
              <p className="text-lg font-semibold">{currentState}</p>
              </div>
            </DialogContent>
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
