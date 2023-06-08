import React from "react";
import { Box, Button, Divider, Flex, Grid } from "@chakra-ui/react";
import SelectTokens from "./SelectTokens";
import Route from "./Route";
import Fees from "./Fees";
import SelectChain from "./SelectChain";
import NFTInfo from "./NFTInfo";

function MetaBox({ bg, color }) {
  return (
    <Box>
      <Flex
        pos={"relative"}
        bg={bg}
        w={"520px"}
        h={"auto"}
        p={"24px"}
        border={"1px solid white"}
        borderRadius={"0.75rem"}
        fontSize={"14px"}
        minW={"350px"}
      >
        <Grid w={"100%"} gap={"12px"}>
          <Flex
            color={color}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <SelectChain bg={bg} color={color} />
            <NFTInfo bg={bg} color={color} />
          </Flex>

          <SelectTokens bg={bg} color={color} />

          <Divider />

          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Route bg={bg} color={color} />
            <Fees bg={bg} color={color} />
          </Flex>

          <Button
            w={"100%"}
            colorScheme="blackAlpha"
            bg={color}
            borderRadius={"999px"}
            border={"none"}
            p={"7px"}
            color={bg}
            fontSize={"14px"}
            mt={"1rem"}
          >
            Connect Wallet
          </Button>
        </Grid>
      </Flex>
    </Box>
  );
}

export default MetaBox;
