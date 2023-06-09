import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Flex, Grid, Text } from "@chakra-ui/react";
import SelectTokens from "./SelectTokens";
import Route from "./Route";
import Fees from "./Fees";
import SelectChain from "./SelectChain";
import NFTInfo from "./NFTInfo";
import Loading from "./Loading";
import { useLoadingContext } from "../context/loading";
import { Chains } from "../utils/Chains";

import fetch from "node-fetch";

function MetaBox({ bg, color, signer }) {
  const { setLoading } = useLoadingContext();

  const [chainsData, setChainsData] = useState([]);
  const [tokensData, setTokensData] = useState([]);
  const [selectedChain, setSelectedChain] = useState({
    key: Chains[0].key,
    index: 0,
  });
  const [selectedToken, setSelectedToken] = useState(tokensData[0]);

  const baseUrl = "https://staging.li.quest/v1";

  const baseUri = "https://api.covalenthq.com/v1";
  const walletAddress = "0x563361c978C1630Af85E8AFd28821E8eF26b1Df8";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
    },
  };

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`${baseUrl}/chains`, options)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setChainsData(data?.chains);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    getAllTokens();
  }, []);

  useEffect(() => {
    getAllTokens();
  }, [selectedChain]);

  async function getAllTokens() {
    setLoading(true);
    await fetch(
      `${baseUri}/${selectedChain.key}/address/${walletAddress}/balances_v2/`,
      options
    )
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data.data);
        setTokensData(data?.data?.items);
        setSelectedToken(data?.data?.items[0]);
        setLoading(false);
      });
  }

  return (
    <Box position={"relative"}>
      <Loading color={color} />

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
            <SelectChain
              bg={bg}
              color={color}
              chainsData={chainsData}
              setSelectedChain={setSelectedChain}
              selectedChain={selectedChain}
            />
            <NFTInfo bg={bg} color={color} />
          </Flex>

          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <SelectTokens
              bg={bg}
              color={color}
              tokensData={tokensData}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
            />

            <Text
              color={color}
              fontWeight={700}
              fontSize={"18px"}
              textTransform={"uppercase"}
            >
              20 {selectedToken?.contract_ticker_symbol}
            </Text>
          </Flex>

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
            {!signer ? "Pay Now" : "Connect Wallet"}
          </Button>
        </Grid>
      </Flex>
    </Box>
  );
}

export default MetaBox;
