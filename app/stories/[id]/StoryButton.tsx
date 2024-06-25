"use client"
import React from 'react';
import { makeTextNftMetadata } from "@/components/generatemetadata";
import { createCreatorClient } from '@zoralabs/protocol-sdk';
import { zora } from "viem/chains";
import { createPublicClient, http } from 'viem';
import { getStory } from '@/lib/getAllStories';
import { useActiveAccount, useActiveWallet } from 'thirdweb/react';

const StoryButton = ({
    story
}: any) => {

    const activeWallet = useActiveWallet();
    const { address } = useActiveAccount();
    console.log("Active Wlalet", activeWallet, address);


    const mintStory = async () => {
        const publicClient = createPublicClient({
            chain: zora,
            transport: http()
        });

        const creatorClient = createCreatorClient({ chainId: zora.id, publicClient });
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
            account: address!
            ,
            // how many tokens to mint to the creator upon token creation
        });
        await tx.wait();

        console.log(`Token minted! Transaction hash: ${tx.hash}`);
    };

    return (
        <button onClick={mintStory}>Mint Story</button>
    );
};

export default StoryButton;