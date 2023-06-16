import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";

function Navbar() {
  return (
    <Box>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        p={"1.5em 3em"}
      >
        <Flex>
          <Box mr={"5rem"}>
            <Image height={30} width={30} src={"/assets/logo.png"} />
          </Box>
          <Text
            color={"rgb(243, 254, 156)"}
            fontSize={"18px"}
            fontWeight={500}
            mr={"4rem"}
            cursor={"pointer"}
            transition={"all 0.3s ease"}
            _hover={{
              color: "rgba(243, 254, 156,0.7)",
            }}
          >
            About
          </Text>

          <Text
            color={"rgb(243, 254, 156)"}
            fontSize={"18px"}
            fontWeight={500}
            mr={"0.5rem"}
            cursor={"pointer"}
            transition={"all 0.3s ease"}
            _hover={{
              color: "rgba(243, 254, 156,0.7)",
            }}
          >
            Docs
          </Text>
        </Flex>
        <Flex>
          <Box
            p={"5px"}
            border={"1px solid rgba(243, 254, 156, 0.2)"}
            rounded={"3px"}
            fontSize={"22px"}
            cursor={"pointer"}
          >
            <FaTwitter color="rgb(243, 254, 156)" />
          </Box>
          <Box
            p={"5px"}
            border={"1px solid rgba(243, 254, 156, 0.2)"}
            rounded={"3px"}
            fontSize={"22px"}
            ml={"1rem"}
            cursor={"pointer"}
          >
            <FaDiscord color="rgb(243, 254, 156)" />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
