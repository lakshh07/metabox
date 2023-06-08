import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import truncateMiddle from "truncate-middle";

function NFTInfo({ bg, color }) {
  return (
    <Flex alignItems={"center"}>
      <Flex alignItems={"center"} cursor={"pointer"}>
        <Image
          width={16}
          height={16}
          alt={"logo"}
          src={"/assets/test_logo_small.svg"}
        />
        <Text px={"0.5rem"}>
          {truncateMiddle(
            "0x563361c978C1630Af85E8AFd28821E8eF26b1Df8" || "",
            5,
            4,
            "..."
          )}
        </Text>
      </Flex>

      <Text
        color={"#71717a"}
        fontWeight={500}
        textAlign={"right"}
        lineHeight={"21px"}
      >
        0.01 ETH
      </Text>
    </Flex>
  );
}

export default NFTInfo;
