"use client";
import React from "react";
import Marketplace from "../components/marketplace/Marketplace";
import { useAccount, useContractRead, useWalletClient } from "wagmi";
import { erc721Abi } from "../utils/ERC721";
import { ethers } from "ethers";

function index() {
  const { address, isConnecting, isDisconnected } = useAccount();

  const contractAddress = "0x831e17A66f38981eA23B73Ae16Af4315C888c917";
  const { data: walletClient, isError, isLoading } = useWalletClient();
  async function gettingThingsDone() {
    console.log(address);
    // const { data, isError, isLoading, error } = useContractRead({
    //   address: contractAddress,
    //   abi: erc721Abi,
    //   functionName: "balanceOf",
    //   args: ["0x563361c978C1630Af85E8AFd28821E8eF26b1Df8"],
    // });
    // console.log(data, isError, isLoading, error);
    // const exchange = new ethers.Contract(contractAddress, erc721Abi, signer);

    let provider = ethers.getDefaultProvider("goerli");
    // const account = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });
    const exchange = new ethers.Contract(
      contractAddress,
      erc721Abi,
      walletClient
    );
    // const signer = provider.getSigner();
    const symbol = await exchange.safeTransferFrom(
      "0x563361c978C1630Af85E8AFd28821E8eF26b1Df8",
      "0x7b1C1702A09521b4160f79f853b7F54ba6b35a59",
      0
    );
    console.log(symbol, "ddd");
  }

  // gettingThingsDone();

  return (
    <>
      <Marketplace />
    </>
  );
}

export default index;
