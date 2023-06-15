import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import SelectTokens from "./SelectTokens";
import Route from "./Route";
import Fees from "./Fees";
import SelectChain from "./SelectChain";
import NFTInfo from "./NFTInfo";
import Loading from "./Loading";
import { useLoadingContext } from "../context/loading";
import { Chains } from "../utils/Chains";
// import { BiSolidGasPump } from "react-icons/bi";
import { MdLocalGasStation } from "react-icons/md";

import fetch from "node-fetch";

function MetaBox({ bg, color, signer, destinationAddress, title, nftParams }) {
  const { setLoading } = useLoadingContext();
  const [getLoading, setGetLoading] = useState(true);
  const [chainsData, setChainsData] = useState([]);
  const [tokensData, setTokensData] = useState([]);
  const [selectedChain, setSelectedChain] = useState({
    key: Chains[0].key,
    index: 0,
    chainId: Chains[0].chainId,
  });
  const [selectedToken, setSelectedToken] = useState(tokensData[0]);
  const [estimate, setEstimate] = useState({});
  const [newDestAddress, setNewDestAddress] = useState();
  const [customSlipage, setCustomSlipage] = useState();

  const baseUrl = "https://staging.li.quest/v1";

  const baseUri = "https://api.covalenthq.com/v1";
  const walletAddress = "0x563361c978C1630Af85E8AFd28821E8eF26b1Df8";

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
    setLoading(false);
    getAllTokens();
    // getQuote();
  }, []);

  useEffect(() => {
    getAllTokens();
  }, [selectedChain]);

  useEffect(() => {
    getQuote();
  }, [selectedToken]);

  async function getAllTokens() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
      },
    };

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
        getQuote();
      });
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  async function getQuote() {
    setGetLoading(true);
    let routesRequest = {
      fromChain: nftParams?.chainId,
      fromAmount: Number(nftParams?.displayCost),
      fromToken: nftParams?.paymentToken,
      toChain: selectedChain?.chainId,
      toToken: selectedToken?.contract_address,
      fromAddress: walletAddress,
    };

    await fetch(
      `${baseUrl}/quote?` + new URLSearchParams(routesRequest),
      options
    )
      .then((res) => res.json())
      .then((data) => {
        getTransactionDetails(data?.estimate?.toAmountMin);
        console.log(data, "setp 1 done");
      });
  }

  async function getTransactionDetails(amount) {
    let routesRequest = {
      fromChain: selectedChain?.chainId,
      fromAmount: Number(amount),
      fromToken: selectedToken?.contract_address,
      toChain: nftParams?.chainId,
      toToken: nftParams?.paymentToken,
      fromAddress: walletAddress,
    };

    await fetch(
      `${baseUrl}/quote?` + new URLSearchParams(routesRequest),
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setEstimate(data);
        console.log(data, "step 2 done");
        setGetLoading(false);
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
            <NFTInfo
              bg={bg}
              color={color}
              nftParams={nftParams}
              baseUrl={baseUrl}
            />
          </Flex>

          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <SelectTokens
              bg={bg}
              color={color}
              tokensData={tokensData}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
            />

            <Flex flexDir={"column"}>
              {getLoading ? (
                <Skeleton
                  mb={"0.25em"}
                  height="20px"
                  rounded={"5px"}
                  width={"6em"}
                />
              ) : (
                <Text
                  color={color}
                  fontWeight={700}
                  fontSize={"18px"}
                  textTransform={"uppercase"}
                >
                  {estimate
                    ? Number(estimate?.transactionRequest?.value) /
                      Math.pow(10, selectedToken?.contract_decimals)
                    : 0}{" "}
                  {selectedToken?.contract_ticker_symbol}
                </Text>
              )}

              <Flex alignItems={"center"} justifyContent={"flex-end"}>
                {getLoading ? (
                  <Skeleton
                    mt={"0.25em"}
                    height="10px"
                    rounded={"3px"}
                    width={"4em"}
                  />
                ) : (
                  <Flex alignItems={"center"} justifyContent={"flex-end"}>
                    <MdLocalGasStation color="gray" fontSize={"11px"} />{" "}
                    <Text color={"gray"} fontSize={"9px"}>
                      :{" "}
                      {estimate
                        ? Number(estimate?.transactionRequest?.gasPrice)
                        : 0}
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>

          <Divider />

          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Route
              bg={bg}
              color={color}
              setNewDestAddress={setNewDestAddress}
              setCustomSlipage={setCustomSlipage}
            />
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
