import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import fetchAddressDetails from "../utils/fetchDetails"

export default function PayButton({address}) {

  console.log(address);

  const proceedToPay = async ()=>{
    console.log(address);
    const details = await fetchAddressDetails(address);
    console.log(details);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="font-semibold text-md border-2 border-zinc-50">Proceed To Pay</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>Processing Payment</DialogTitle>
          <DialogDescription>
            Please wait while we are processing your payment.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
