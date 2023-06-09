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
import { Chains } from "../utils/Chains";
import { useLoadingContext } from "../context/loading";

function SelectChain({ bg, color, setSelectedChain, selectedChain }) {
  const { setLoading } = useLoadingContext();
  const [popOpen, setPopOPen] = useState(false);

  async function changeNetwork(chain, index) {
    if (window.ethereum) {
      try {
        setLoading(true);
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chain.chainIdHex }],
        });
        setSelectedChain({ key: chain.key, index: index });
        setPopOPen(!popOpen);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
    }
  }

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
              style={{ borderRadius: "50%" }}
              src={Chains[selectedChain.index]?.logoURI}
            />
            <ChevronDownIcon pl={"0.2rem"} boxSize={4} />
          </Flex>
        </PopoverTrigger>
        <PopoverContent maxW={"180px"} _focusVisible={{ outline: "none" }}>
          <PopoverBody p={"0.3em 0.3em 0.1em"}>
            {Chains?.map((chain, index) => {
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
                    changeNetwork(chain, index);
                  }}
                >
                  <Image
                    width={18}
                    height={18}
                    alt={"logo"}
                    src={chain.logoURI}
                    style={{ borderRadius: "50%" }}
                  />
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
