"use client";
import styles from "./page.module.css";
// import MetaBox from "@/app/components/Box";
import LoadingContext from "./context/loading";
import { useState } from "react";
import Main from "./components/Main";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const signer = "";
  const destinationAddress = "";

  return (
    // <LoadingContext.Provider value={{ loading, setLoading }}>
    <>
      {/* <MetaBox
          bg={"white"}
          color={"#1A202C"}
          signer={signer}
          destinationAddress={destinationAddress}
          nftParams={{
            title: "Autumn", // title of NFT
            displayCost: "2000000000000000", //di
            address: "0x3007E0eB44222AC69E1D3c93A9e50F9CA73F53a1", //NFT Address
            chainId: 1, //NFT exist i.e Destination Chain ToChain
            paymentToken: "0x0000000000000000000000000000000000000000", // NFT price token address ToToken destination token
            mintParams: {
              params: ["0x563361c978C1630Af85E8AFd28821E8eF26b1Df8", 1], // destination NFT account to whom nft would be transfered
              cost: "0.00005", // NFT price in wei or the total amount
            },
          }}
        ></MetaBox> */}
      <Main />
    </>
    // </LoadingContext.Provider>
  );
}
