import { Chains } from "@/app/utils/Chains";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";

function NftForm({
  loading,
  selectedChain,
  setSelectedChain,
  contAddData,
  setContAddData,
  tknIdData,
  setTknIdData,
  getDetails,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [popOpen, setPopOPen] = useState(false);

  return (
    <Box>
      <Flex
        position={"fixed"}
        zIndex={"999"}
        bottom={"0"}
        right={"0"}
        onClick={onOpen}
        bg={"#2af4ad"}
        p={"0.5em 1.5em"}
        m={"2em"}
        borderRadius={"20px"}
        alignItems={"center"}
        cursor={"pointer"}
      >
        <Text fontWeight={600} color={"#111"}>
          Add NFT
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"#111"}
          color={"#f5f5f5"}
          boxShadow={"rgba(245, 245, 245, 0.2) 0px 5px 15px"}
        >
          <ModalHeader>List New NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>NFT Contract Address</FormLabel>
              <Input
                type="text"
                placeholder="0x000..000"
                value={contAddData}
                onChange={(e) => setContAddData(e.target.value)}
              />
            </FormControl>
            <FormControl mt={"1.5em"}>
              <FormLabel>TokenID</FormLabel>
              <Input
                type="text"
                placeholder="0"
                value={tknIdData}
                onChange={(e) => setTknIdData(e.target.value)}
              />
            </FormControl>

            <Popover
              placement={"bottom-start"}
              isOpen={popOpen}
              closeOnEsc={true}
            >
              <PopoverTrigger>
                <Flex
                  alignItems={"center"}
                  cursor={"pointer"}
                  onClick={() => {
                    setPopOPen(!popOpen);
                  }}
                  mt={"1.5em"}
                >
                  <Image
                    width={15}
                    height={15}
                    alt={"logo"}
                    style={{ borderRadius: "50%" }}
                    src={Chains[selectedChain.index]?.logoURI}
                  />
                  <Text ml={"0.5em"}>{Chains[selectedChain.index]?.name}</Text>
                  <ChevronDownIcon pl={"0.2rem"} boxSize={4} />
                </Flex>
              </PopoverTrigger>
              <PopoverContent
                maxW={"180px"}
                _focusVisible={{ outline: "none" }}
              >
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
                          setSelectedChain({
                            key: chain.ah_key,
                            index: index,
                            chainId: chain.chainId,
                          });
                          setPopOPen(!popOpen);
                        }}
                      >
                        <Image
                          width={18}
                          height={18}
                          alt={"logo"}
                          src={chain.logoURI}
                          style={{ borderRadius: "50%" }}
                        />
                        <Text pl={"0.5rem"} fontWeight={"500"} color={"#111"}>
                          {chain.name}
                        </Text>
                      </Flex>
                    );
                  })}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </ModalBody>

          <ModalFooter>
            <Button isLoading={loading} onClick={() => getDetails()}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default NftForm;
