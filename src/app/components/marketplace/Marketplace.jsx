import React, { useEffect, useState } from "react";
import Main from "./Main";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";
import NftsSection from "./NftsSection";
import { Network, Alchemy } from "alchemy-sdk";
import {
  useAccount,
  useContractRead,
  useWalletClient,
  usePublicClient,
} from "wagmi";
import { ethers } from "ethers";
import { MetaboxMarketplaceAddress_mumbai } from "@/app/utils/contractAddress";
import marketplaceAbi from "@/contracts/ABI/MetaBoxMarketplace.json";
import ERC721Abi from "@/contracts/ABI/ERC721.json";
import NftForm from "./NftForm";
import { Chains } from "@/app/utils/Chains";

function Marketplace() {
  const [checkLoading, setCheckLoading] = useState(false);
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [selectedChain, setSelectedChain] = useState({
    key: Chains[0].ah_key,
    index: 0,
    chainId: Chains[0].chainId,
  });

  const [contAddData, setContAddData] = useState("");
  const [tknIdData, setTknIdData] = useState("");

  const [data, setData] = useState({});

  const settings = {
    apiKey: process.env.NEXT_PUBLIC_GOERLI_ALCHEMY_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_GOERLI, // Replace with your network.
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  async function getDetails() {
    await fetch(
      `${process.env.NEXT_PUBLIC_MUMBAI_ALCHEMY_KEY}/getNFTMetadata?contractAddress=${contAddData}&tokenId=${tknIdData}`,
      options
    )
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data.data);
        // console.log("===",data);
        setData({
          title: `${data.title}`,
          description: `${data.description}`,
          image: `${data.media[0].gateway}`,
        });
      });
  }

  async function getNftListOnMarketplace(price) {
    setCheckLoading(true);

    const ERC721 = new ethers.Contract(contAddData, ERC721Abi, walletClient);

    await getDetails();

    const resultt = await ERC721.approve(
      MetaboxMarketplaceAddress_mumbai,
      tknIdData
    );

    const marketplace = new ethers.Contract(
      MetaboxMarketplaceAddress_mumbai,
      marketplaceAbi,
      walletClient
    );

    let overrides = {
      value: 0,
    };

    // const result = await marketplace.createMarketItem(
    //   contAddData,
    //   tknIdData,
    //   4000000000000,
    //   data,
    //   "mumbai",
    //   overrides
    // );

    // console.log(result);

    setTimeout(() => {
      setCheckLoading(false);
    }, 5000);
  }

  async function getData() {
    const marketplace = new ethers.Contract(
      MetaboxMarketplaceAddress_mumbai,
      marketplaceAbi,
      publicClient
    );

    const result = marketplace.fetchActiveItems();

    console.log(result);
  }
  // const { dataa, isError, isLoading, error } = useContractRead({
  //   address: MetaboxMarketplaceAddress_mumbai,
  //   abi: marketplaceAbi,
  //   functionName: "fetchActiveItems",
  //   watch: true,
  // });
  // console.log(dataa, error);
  // useEffect(() => {
  //   console.log(dataa);
  // }, []);

  // getData();

  return (
    <Box bg={"#19191D"}>
      <Navbar />
      <Main />
      <NftsSection />
      <NftForm
        loading={checkLoading}
        selectedChain={selectedChain}
        setSelectedChain={setSelectedChain}
        contAddData={contAddData}
        setContAddData={setContAddData}
        tknIdData={tknIdData}
        setTknIdData={setTknIdData}
        getDetails={getNftListOnMarketplace}
      />
    </Box>
  );
}

export default Marketplace;
