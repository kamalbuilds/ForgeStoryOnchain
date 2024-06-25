
import {
    generateTextNftMetadataFiles,
    makeTextTokenMetadata,
  } from "@zoralabs/protocol-sdk";
  import { pinFileWithPinata, pinJsonWithPinata } from "@/lib/pinata";
  
  export async function makeTextNftMetadata({ text }: { text: string }) {
    const {
      name,
      mediaUrlFile,
      thumbnailFile,
    } = await generateTextNftMetadataFiles(text);
  
    const mediaFileIpfsUrl = await pinFileWithPinata(mediaUrlFile);
    const thumbnailFileIpfsUrl = await pinFileWithPinata(thumbnailFile);
  
    const metadataJson = makeTextTokenMetadata({
      name,
      textFileUrl: mediaFileIpfsUrl,
      thumbnailUrl: thumbnailFileIpfsUrl,
    });
  
    const jsonMetadataUri = await pinJsonWithPinata(metadataJson);
  
    return jsonMetadataUri;
  }
  