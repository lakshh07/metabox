import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

function MarketplaceSection() {
  return (
    <Link href={"/marketplace"}>
      <Box
        mt={"15rem"}
        mb={"5rem"}
        bg={"#730FE6"}
        py={"6rem"}
        align={"center"}
        cursor={"pointer"}
      >
        <Marquee gradient={false} direction="left" speed={100}>
          <Heading fontSize={"4em"}>
            Checkout our NFT Marketplace to try our widget -&nbsp;
          </Heading>
          <Heading fontSize={"4em"}>
            Checkout our NFT Marketplace to try our widget -&nbsp;
          </Heading>
        </Marquee>
      </Box>
    </Link>
  );
}

export default MarketplaceSection;
