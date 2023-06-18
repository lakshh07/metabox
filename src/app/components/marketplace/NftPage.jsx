"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Tag,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Navbar from "./Navbar";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import MetaBox from "../Widget/Box";

// import MetaBox from "../../../components/Box";

function NftPage() {
  const router = useRouter();
  const params = useParams();

  const signer = "";
  const destinationAddress = "";

  const nftData = [];

  return (
    <Box>
      <Navbar />

      <Text
        mx={"8rem"}
        color={"#f5f5f5"}
        cursor={"pointer"}
        onClick={() => router.back()}
        textDecoration={"underline"}
      >
        Back
      </Text>

      <Grid mx={"8rem"} mt={"2.2rem"} className="nft-grid">
        <GridItem
          border={"1px solid gray"}
          p={"1.5em"}
          borderRadius={"15px"}
          mr={"3em"}
          className={"img-section"}
        >
          <Image
            height={460}
            width={570}
            src={nftData[params.id].img}
            style={{ borderRadius: "10px" }}
          />
        </GridItem>

        <GridItem textAlign={"left"} className={"details-section"}>
          <Text opacity={0.8} fontWeight={600}>
            {nftData[params.id].contractAdd}
          </Text>
          <Heading my={"10px"} fontWeight={700} fontSize={"3em"}>
            {nftData[params.id].title}
          </Heading>

          <Tag
            my={"5px"}
            bg={"rgb(243, 254, 156)"}
            textTransform={"uppercase"}
            fontWeight={600}
          >
            {nftData[params.id].price}
          </Tag>

          <Text mt={"10px"} opacity={0.8}>
            {nftData[params.id].des}
          </Text>
        </GridItem>

        <GridItem
          bg={"#35343B"}
          h={"min-content"}
          p={"0.5rem"}
          borderRadius={"30px"}
          ml={"auto"}
          className={"interact-section"}
          mt={"20px"}
        >
          <Box
            bg={"rgb(90, 87, 96)"}
            p={"7px"}
            borderRadius={"50px"}
            align={"center"}
            cursor={"pointer"}
          >
            <AiOutlineHeart fontSize={"25px"} />
          </Box>
          <Box
            bg={"rgb(90, 87, 96)"}
            p={"7px"}
            borderRadius={"50px"}
            my={"10px"}
            align={"center"}
            cursor={"pointer"}
          >
            <AiOutlineShareAlt fontSize={"25px"} />
          </Box>
          <Box
            bg={"rgb(90, 87, 96)"}
            p={"7px"}
            borderRadius={"50px"}
            align={"center"}
            cursor={"pointer"}
          >
            <BsThreeDots fontSize={"25px"} />
          </Box>
        </GridItem>

        <GridItem className="wid-section">
          <MetaBox
            bg={"white"}
            color={"#1A202C"}
            signer={signer}
            destinationAddress={destinationAddress}
            nftParams={{
              title: nftData[params.id].title, // title of NFT
              displayCost: "2000000000000000", //di
              address: nftData[params.id].contractAdd, //NFT Address
              chainId: 137, //NFT exist i.e Destination Chain ToChain
              paymentToken: "0x0000000000000000000000000000000000000000", // NFT price token address ToToken destination token
              mintParams: {
                abi: "",
                params: ["0x563361c978C1630Af85E8AFd28821E8eF26b1Df8", 1], // destination NFT account to whom nft would be transfered
                cost: "0.00005", // NFT price in wei or the total amount
              },
            }}
          ></MetaBox>
          {/* <MetaBox /> */}
        </GridItem>
      </Grid>
    </Box>
  );
}

export default NftPage;
