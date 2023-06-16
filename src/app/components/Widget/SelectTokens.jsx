import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function SelectTokens({
  bg,
  color,
  tokensData,
  selectedToken,
  setSelectedToken,
}) {
  const tokens = [
    { name: "Ethereum", logo: "/assets/eth.png", currency: "eth" },
    { name: "Polygon", logo: "/assets/polygon.svg", currency: "matic" },
    { name: "FVM", logo: "/assets/test_logo_small.svg", currency: "fil" },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position={"relative"} color={color}>
      <Flex>
        <Flex
          alignItems={"center"}
          justifyContent={"flex-start"}
          onClick={onOpen}
          cursor={"pointer"}
        >
          <Image
            height={32}
            width={32}
            alt={"logo"}
            style={{ borderRadius: "50%" }}
            src={
              selectedToken?.logo_url
                ? selectedToken?.logo_url
                : "/assets/token.png"
            }
          />
          <Text
            fontSize={"20px"}
            fontWeight={700}
            pl={"0.6em"}
            pr={"0.3em"}
            textTransform={"uppercase"}
          >
            {selectedToken?.contract_ticker_symbol}
          </Text>
          <ChevronDownIcon boxSize={4} />
        </Flex>

        <Modal
          position={"relative"}
          isOpen={isOpen}
          onClose={onClose}
          blockScrollOnMount
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color={color}>Select Token</ModalHeader>
            <ModalCloseButton color={color} />
            <ModalBody
              color={color}
              p={"8px 15px"}
              maxH={"300px"}
              overflow={"scroll"}
            >
              {tokensData?.map((token, index) => {
                return (
                  <Flex
                    key={index}
                    w={"100%"}
                    alignItems={"center"}
                    cursor={"pointer"}
                    _hover={{ backgroundColor: "#f5f5f5" }}
                    borderRadius={"5px"}
                    p={"0.8rem"}
                    mb={"0.2rem"}
                    onClick={() => {
                      setSelectedToken(token);
                      onClose();
                    }}
                  >
                    <Image
                      width={35}
                      height={35}
                      alt={"logo"}
                      style={{ borderRadius: "50%" }}
                      src={
                        token.logo_url ? token.logo_url : "/assets/token.png"
                      }
                    />
                    <Flex
                      w={"100%"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Flex
                        pl={"1rem"}
                        flexDirection={"column"}
                        alignItems={"flex-start"}
                      >
                        <Text
                          fontSize={"16px"}
                          lineHeight={"16px"}
                          fontWeight={"500"}
                          textTransform={"uppercase"}
                        >
                          {token.contract_ticker_symbol}
                        </Text>
                        <Text
                          fontSize={"14px"}
                          lineHeight={"20px"}
                          fontWeight={"400"}
                          color={"#9ca3af"}
                          textTransform={"capitalize"}
                        >
                          {token.contract_name}
                        </Text>
                      </Flex>

                      <Text>{`${(
                        token.balance / Math.pow(10, token.contract_decimals)
                      ).toFixed(2)}  ${token.contract_ticker_symbol}`}</Text>
                    </Flex>
                  </Flex>
                );
              })}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
}

export default SelectTokens;
