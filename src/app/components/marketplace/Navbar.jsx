import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <Box>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        p={"1.5em 6em"}
      >
        <Flex alignItems={"center"}>
          <Box mr={"5rem"}>
            <Link href={"/"}>
              <Image height={30} width={30} src={"/assets/logo.png"} />
            </Link>
          </Box>
          <Flex alignItems={"center"}>
            <Text
              mr={"5em"}
              cursor={"pointer"}
              transition={"all 0.3s ease"}
              _hover={{
                color: "rgba(255, 255, 255,0.7)",
              }}
            >
              Discover
            </Text>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search"
                rounded={"20px"}
                variant={"filled"}
                bg={"#2A2A2A"}
                w={"400px"}
                _hover={{
                  backgroundColor: "none",
                }}
                _focusVisible={{
                  ouline: "none",
                }}
              />
            </InputGroup>
          </Flex>
        </Flex>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;
