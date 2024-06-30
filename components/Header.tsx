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

  const wallets = [createWallet("com.coinbase.wallet")];

  return (
    <header className="relative p-4 lg:p-8 bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg flex items-center justify-between">
      <Link href="/" className="absolute left-4 lg:left-8">
        <h1 className="text-3xl lg:text-5xl font-bold text-white">ForgeStoryonChain</h1>
      </Link>
      <div className="flex-1 flex justify-center">
        <div className="text-center">
          <h2 className="text-lg lg:text-2xl text-white">Bring your stories to Life!</h2>
          <div className="relative mt-2">
            <div className="absolute bg-purple-700 inset-0 transform -rotate-1 rounded-md" />
            <p className="relative text-white px-2">By minting them onchain</p>
          </div>
        </div>
      </div>
      <div className="absolute right-4 lg:right-8 flex space-x-2 lg:space-x-4">
        <Link href="/">
          <FilePen className="h-6 w-6 lg:h-8 lg:w-8 text-white border border-white p-1 rounded-md hover:bg-white hover:text-purple-500 transition duration-300 ease-in-out cursor-pointer" />
        </Link>
        <Link href="/stories">
          <BookOpen className="h-6 w-6 lg:h-8 lg:w-8 text-white border border-white p-1 rounded-md hover:bg-white hover:text-purple-500 transition duration-300 ease-in-out cursor-pointer" />
        </Link>
        <ConnectButton
          client={client}
          wallets={wallets}
          chains={[defineChain(baseSepolia), defineChain(base)]}
          connectButton={{
            label: "Connect",
            className:
              "bg-white text-purple-500 px-3 py-1 lg:px-4 lg:py-2 rounded-md hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out"
          }}
        />
      </div>
    </header>
  );
};

export default Header;
