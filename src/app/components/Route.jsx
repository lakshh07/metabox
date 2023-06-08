import { CheckCircleIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

function Route({ bg, color }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex alignItems={"center"}>
        <CheckCircleIcon color={"green.400"} />
        <Text fontSize={"14px"} lineHeight={"21px"} color={color} px={"0.5rem"}>
          Optimal Route
        </Text>
        <SettingsIcon
          color={"blackAlpha.500"}
          onClick={onOpen}
          cursor={"pointer"}
        />
      </Flex>

      <Modal
        position={"relative"}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={color}>Transaction Setting</ModalHeader>
          <ModalCloseButton color={color} />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Route;
