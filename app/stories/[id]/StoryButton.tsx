"use client";
import React from 'react';
import { makeTextNftMetadata } from "@/components/makeTextNftMetadata";
import { makeContractMetadata } from '@/components/makeContractMetadata';
import { createCreatorClient } from '@zoralabs/protocol-sdk';
// import { zoraSepolia } from "viem/chains";
import { createPublicClient, http } from 'viem';
import { useActiveWallet, useSendTransaction } from 'thirdweb/react';
import { Button } from '@/components/ui/button';
import { createThirdwebClient, getContract, prepareContractCall } from 'thirdweb';
import { zoraSepolia } from 'thirdweb/chains';

const StoryButton = ({ story }: any) => {
  const activeWallet = useActiveWallet();
  const address = activeWallet?.getAccount()?.address;
  const { mutate: sendTransaction, isPending } = useSendTransaction();

  const zoraSepoliaviem = {
    id: 11155111,
    name: "zoraSepolia",
    rpcUrls: {
      default: {
        http: ['https://sepolia.rpc.zora.energy'],
        webSocket: ['wss://sepolia.rpc.zora.energy'],
      },
    },
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorers: {
        default: {
          name: 'Zora Sepolia Explorer',
          url: 'https://sepolia.explorer.zora.energy/',
          apiUrl: 'https://sepolia.explorer.zora.energy/api',
        },
      },
    testnet: true,
  };


//   {
//     "story": "The-Adventures-of-Lily-and-Ben",
//     "pages": [
//         {
//             "png": "/stories/The-Adventures-of-Lily-and-Ben/page1.png",
//             "txt": "Once upon a time, in a small town nestled between rolling green hills and blooming meadows, lived two best friends named Lily and Ben. Lily had flowing golden hair that sparkled like sunshine, fair skin that glowed like the moon, and bright emerald eyes that twinkled with mischief. She loved to wear colorful ribbons in her hair and always had a curious smile on her face. Ben, on the other hand, had messy black hair that reminded one of a midnight sky, warm olive skin that glistened in the sunlight, and deep brown eyes that shone with wisdom. He wore a pair of round glasses perched on his nose and carried a backpack filled with books wherever he went.\r\n\r\nEvery morning, Lily and Ben would meet at the old oak tree near their houses and walk hand in hand to the quaint little school at the edge of town. The school was a cozy building with red brick walls, ivy climbing up the sides, and colorful flowers blooming in the courtyard. The classrooms were filled with bright posters and gentle sunlight streaming through the windows, creating a warm and inviting atmosphere.\r\n\r\nOne day, as Lily and Ben were walking to school, they stumbled upon a mysterious map fluttering in the wind. With excitement in their eyes, they decided to follow the map's twists and turns, leading them on an unexpected adventure through enchanted forests, over sparkling streams, and up towering mountains. Along the way, they met friendly woodland creatures and discovered magical treasures hidden in the most unexpected places.\r\n\r\nAs the sun began to set and the stars emerged in the sky, Lily and Ben realized they had gone farther than they ever imagined. But with each other by their side, they knew they could always find their way back home. So hand in hand, they journeyed back to their cozy town, their hearts filled with memories of an unforgettable day."
//         }
//     ]
//     }

const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT!
  });

  const mintStory = async () => {

    const publicClient = createPublicClient({
      chain: zoraSepoliaviem,
      transport: http()
    });

    const creatorClient = createCreatorClient({ chainId: zoraSepolia.id, publicClient });

    // Upload metadata for each page
    const pageMetadataUris = await Promise.all(story.pages.map(async (page: any) => {
      const metadataUri = await makeTextNftMetadata({ text: page.txt });
      return metadataUri;
    }));

    // Create contract metadata
    const contractMetadataUri = await makeContractMetadata({
      imageFile: story.pages[0].png, // Using the first page's image for simplicity
      name: story.story,
      description: story.pages[0].txt, // Using the first page's text for simplicity
    });


    // Mint the token using the metadata URI
    const mintArgs = {
      metadataUri: pageMetadataUris[0], // Using the first page's metadata URI for simplicity
      to: address,
    };

    const tx = await creatorClient.create1155({
      contract: {
        name: story.story,
        uri: contractMetadataUri,
      },
      token: {
        tokenMetadataURI: mintArgs.metadataUri,
      },
      account: address!,
    });

    console.log(`Token minted! Transaction hash: ${tx}`);
    console.log(tx);

    const contract = getContract({
        client,
        chain: zoraSepolia,
        address: tx.collectionAddress,
      });

    const transaction = prepareContractCall({
        contract: contract,
        method: "function mint(address to)",
        params: tx.parameters.args,
        value: BigInt(0),
      });
      console.log(transaction, "transaction")
      
  
    const sendit = await sendTransaction(transaction);
    console.log(sendit);
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
    <Button onClick={mintStory} className='bg-gradient-to-r from-pink-500 to-rose-500 p-4' >Mint This Story</Button>
    </div>
  );
};

export default StoryButton;