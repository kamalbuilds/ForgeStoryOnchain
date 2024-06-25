// StoryPage.tsx
import React from 'react';
import { getAllStories, getStory } from "@/lib/getAllStories";
import { notFound } from "next/navigation";
import Story from "@/components/Story";
import { makeTextNftMetadata } from "@/components/generatemetadata";
import { createCreatorClient } from '@zoralabs/protocol-sdk';

interface StoryPageProps {
  params: {
    id: string;
  }
}

const StoryPage = ({ params: { id } }: StoryPageProps) => {
  const decodedId = decodeURIComponent(id);
  const story = getStory(decodedId);

  if (!story) {
    return notFound();
  }

  const mintStory = async () => {
    const creatorClient = createCreatorClient({ chainId, publicClient });
    const metadataUri = await makeTextNftMetadata({ text: story.content });
    console.log(`Metadata URI: ${metadataUri}`);
    
    // Mint the token using the metadata URI
    const mintArgs = {
      metadataUri,
      to: "RECIPIENT_ADDRESS",
    };
  
    const tx = await creatorClient.create1155({
      contract: {
        // contract name
        name: "testContract",
        // contract metadata uri
        uri: "ipfs://DUMMY/contract.json",
      },
      token: {
        tokenMetadataURI: "ipfs://DUMMY/token.json",
      },
      // account to execute the transaction (the creator)
      account: creatorAccount
    ,
      // how many tokens to mint to the creator upon token creation
    });
    await tx.wait();
  
    console.log(`Token minted! Transaction hash: ${tx.hash}`);
  };

  return (
    <div>
      <button onClick={mintStory}>Mint Story</button>
      <Story story={story} />
    </div>
  );
};

export default StoryPage;
