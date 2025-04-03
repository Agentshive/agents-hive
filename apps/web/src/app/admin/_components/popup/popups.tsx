import { useState } from "react";
import { Button } from "~/components/web/ui/button";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/web/ui/dialog";
import Image from "next/image";

interface NewsletterPopupProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function NewsletterPopup({ isOpen, onOpenChange }: NewsletterPopupProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const isControlled = isOpen !== undefined && onOpenChange !== undefined;
  const openState = isControlled ? isOpen : internalIsOpen;
  const setOpenState = isControlled ? onOpenChange : setInternalIsOpen;

  const handleSubscribe = () => {
    console.log("Subscribed with:", email);
    setOpenState(false);
  };

  return (
    <Dialog open={openState} onOpenChange={setOpenState}>
      <DialogTrigger asChild>
        <Button
          className="text-black hover:text-gray-600 p-0 h-auto font-normal"
        >
          Explore Agents <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="w-full max-w-4xl bg-white rounded-lg p-0 shadow-xl border-none overflow-hidden">
        <div className="flex flex-row h-full">
          {/* Left Side - Image */}
          <div className="w-1/2 bg-gray-100 flex items-center justify-center p-8">
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              {/* Replace this div with your actual Image component */}
              <span className="text-gray-500">Newsletter Image</span>
            </div>
          </div>
          
          {/* Vertical Divider */}
          <div className="w-px bg-gray-200 my-4" />
          
          {/* Right Side - Newsletter Content */}
          <div className="w-1/2 p-8 flex flex-col justify-center items-center text-center gap-4">
            <h3 className="text-2xl font-bold text-gray-900">Subscribe to our Newsletter!</h3>
            <p className="text-gray-600 text-sm">Get our updates</p>
            
            <div className="w-full mt-6">
              <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
                Contact Email:*
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johnnaihew@xyz.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>
            
            <div className="w-full mt-4 flex justify-center">
              <Button
                variant="link"
                className="text-black hover:text-gray-600 p-0 h-auto font-normal text-sm"
                onClick={() => setOpenState(false)}
              >
                Explore Agents <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium"
              onClick={handleSubscribe}
              disabled={!email}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}