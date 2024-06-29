"use client";
import { BookOpen, FilePen } from "lucide-react";
import Link from "next/link";
import { defineChain } from "thirdweb";
import { base, baseSepolia } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";

const Header = () => {

 const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT!
 });
 
  const wallets = [
    createWallet("com.coinbase.wallet")
  ]
  return (
    <header className="relative p-8 lg:p-16 text-center bg-gradient-to-r from-purple-600 to-blue-500">
      <Link href="/">
        <h1 className="text-4xl lg:text-6xl font-bold text-white">ForgeStoryonChain</h1>
        <div className="flex justify-center items-center whitespace-nowrap space-x-5 text-xl lg:text-3xl mt-4">
          <h2 className="text-white">Bring your stories on Chain</h2>
          <div className="relative">
            <div className="absolute bg-purple-700 -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1 transform-gpu" />
            <p className="relative text-white">To life!</p>
          </div>
        </div>
      </Link>
      <div className="absolute top-5 right-5 flex space-x-4">
        <Link href="/">
          <FilePen className="h-8 w-8 lg:w-10 lg:h-10 mx-auto text-white mt-10 border border-white p-2 rounded-md hover:bg-white hover:text-purple-500 transition duration-300 ease-in-out cursor-pointer" />
        </Link>
        <Link href="/stories">
          <BookOpen className="h-8 w-8 lg:w-10 lg:h-10 mx-auto text-white mt-10 border border-white p-2 rounded-md hover:bg-white hover:text-purple-500 transition duration-300 ease-in-out cursor-pointer" />
        </Link>
        <ConnectButton client={client} wallets={wallets} chains={[defineChain(baseSepolia), defineChain(base)]} connectButton={{
          label: "Connect with Coinbase Smart Wallet",
          className: "bg-white text-purple-500 px-4 py-2 rounded-md hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out"
        }}/>
      </div>
    </header>
  );
};

export default Header;
