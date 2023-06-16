import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

function MainSection() {
  return (
    <Box position={"relative"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        position={"relative"}
        height={"90vh"}
        px={"8rem"}
      >
        <Flex flexDir={"column"} mt={"-6%"}>
          <Heading
            className="hero-span"
            fontSize={"4rem"}
            textTransform={"uppercase"}
            letterSpacing={"1px"}
          >
            The MetaBox
          </Heading>
          <Text
            fontSize={"1.5rem"}
            pl={"10px"}
            fontWeight={600}
            letterSpacing={"2px"}
          >
            NFT.Click.Buy.
          </Text>
        </Flex>
        <Box
          position={"absolute"}
          right={"13%"}
          top={"-12%"}
          className="hero-img"
        >
          <Image height={1157} width={400} src={"/assets/main.png"} />
        </Box>
      </Flex>
    </Box>
  );
}

export default MainSection;
