import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";

function SelectChain({ bg, color }) {
  const chains = [
    { name: "Ethereum", logo: "/assets/eth.png" },
    { name: "Polygon", logo: "/assets/polygon.svg" },
    { name: "FVM", logo: "/assets/test_logo_small.svg" },
  ];

  const [selectedChain, setSelectedChain] = useState(chains[0]);
  const [popOpen, setPopOPen] = useState(false);

  return (
    <Flex justifyContent={"flex-start"} alignItems={"center"}>
      <Text pr={"0.5em"}>From</Text>

      <Popover placement={"bottom-start"} isOpen={popOpen} closeOnEsc={true}>
        <PopoverTrigger>
          <Flex
            alignItems={"center"}
            cursor={"pointer"}
            onClick={() => {
              setPopOPen(!popOpen);
            }}
          >
            <Image
              width={15}
              height={15}
              alt={"logo"}
              src={selectedChain.logo}
            />
            <ChevronDownIcon pl={"0.2rem"} boxSize={4} />
          </Flex>
        </PopoverTrigger>
        <PopoverContent maxW={"150px"} _focusVisible={{ outline: "none" }}>
          <PopoverBody p={"0.3em 0.3em 0.1em"}>
            {chains.map((chain, index) => {
              return (
                <Flex
                  key={index}
                  w={"100%"}
                  alignItems={"center"}
                  cursor={"pointer"}
                  _hover={{ backgroundColor: "#f5f5f5" }}
                  borderRadius={"5px"}
                  p={"0.3rem"}
                  mb={"0.2rem"}
                  onClick={() => {
                    setSelectedChain({ name: chain.name, logo: chain.logo });
                    setPopOPen(!popOpen);
                  }}
                >
                  <Image width={18} height={18} alt={"logo"} src={chain.logo} />
                  <Text pl={"0.5rem"} fontWeight={"500"}>
                    {chain.name}
                  </Text>
                </Flex>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}

export default SelectChain;
