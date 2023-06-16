import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";

function Fees({ bg, color }) {
  return (
    <Box color={color}>
      <Popover placement={"top-end"}>
        <PopoverTrigger>
          <Flex alignItems={"center"} cursor={"pointer"}>
            <Text
              color={"#a1a1aa"}
              fontSize={"12px"}
              lineHeight={"18px"}
              pr={"0.5rem"}
            >
              Expected Fee
            </Text>
            <InfoOutlineIcon color={"#a1a1aa"} />
          </Flex>
        </PopoverTrigger>
        <PopoverContent maxW={"200px"} _focusVisible={{ outline: "none" }}>
          <PopoverArrow />
          <PopoverBody border={"none"}>
            <Grid gap={"5px"} p={"0px"} fontSize={"12px"}>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text fontWeight={500}>Application Fee</Text>
                <Text fontWeight={400}>0 ETH</Text>
              </Flex>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text fontWeight={500}>Bridge Fee</Text>
                <Text fontWeight={400}>0 ETH</Text>
              </Flex>
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export default Fees;
