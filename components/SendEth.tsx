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
import PayButton from "./PayButton"

export default function SendEth() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="font-semibold text-md border-2 border-zinc-50">Send Eth</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>Send Ethereum</DialogTitle>
          <DialogDescription>
            Enter reciever address, amount (in wei) and message.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Address" className="text-right">
              Address
            </Label>
            <Input id="Address" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Amount" className="text-right">
              Amount
            </Label>
            <Input id="Amount" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Message" className="text-right">
              Message
            </Label>
            <Input id="Message" value="" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <PayButton/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
