import { Box, Flex, Heading, Tag, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

function Main() {
  return (
    <Box position={"relative"}>
      <Flex mx={"6rem"} mt={"3.8rem"} position={"relative"} h={"90vh"}>
        <Box>
          <Heading
            fontSize={"5.5rem"}
            fontWeight={600}
            textTransform={"uppercase"}
          >
            The{" "}
            <Tag
              fontSize={"5.5rem"}
              bg={"transparent"}
              fontWeight={600}
              color={"#2af4ad"}
              border={"1px solid #fff"}
              borderRadius={"50px"}
              px={"20px"}
            >
              nft
            </Tag>{" "}
            destination for <br /> trusted brands <br /> &
            <Tag
              fontSize={"5.5rem"}
              bg={"transparent"}
              fontWeight={600}
              color={"#2af4ad"}
              border={"1px solid #fff"}
              borderRadius={"50px"}
              px={"20px"}
            >
              artists
            </Tag>
          </Heading>
          <Text
            textAlign={"left"}
            w={"30%"}
            textTransform={"uppercase"}
            color={"rgba(255,255,255,0.8)"}
            mt={"6em"}
            pl={"10px"}
          >
            engage directly with artists & brands. Rsvp for ourexclusive events
            . Buy your favorite nfts
          </Text>
        </Box>
        <Box position={"absolute"} right={"5%"} top={"17%"}>
          <Image height={480} width={380} src={"/assets/marketbg.png"} />
        </Box>
      </Flex>
    </Box>
  );
}

export default Main;
