import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import truncateMiddle from "truncate-middle";

function NFTInfo({ bg, color, nftParams, baseUrl }) {
  const [nftChainDetails, setNftChainDetails] = useState();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  async function getNftTokenDetails() {
    await fetch(
      `${baseUrl}/token?` +
        new URLSearchParams({
          chain: nftParams?.chainId,
          token: nftParams?.paymentToken,
        }),
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setNftChainDetails(data);
      });
  }

  useEffect(() => {
    // getNftTokenDetails();
  }, []);

  return (
    <Flex alignItems={"center"}>
      <Flex alignItems={"center"} cursor={"pointer"}>
        <Image
          width={16}
          height={16}
          alt={"logo"}
          src={nftChainDetails?.logoURI}
        />
        <Text px={"0.5rem"}>
          {nftParams?.title
            ? nftParams?.title
            : truncateMiddle(nftParams?.address || "", 5, 4, "...")}
        </Text>
      </Flex>

      <Text
        color={"#71717a"}
        fontWeight={500}
        textAlign={"right"}
        lineHeight={"21px"}
      >
        {nftParams?.displayCost / Math.pow(10, nftChainDetails?.decimals)}{" "}
        {nftChainDetails?.symbol}
      </Text>
    </Flex>
  );
}

export default NFTInfo;
