import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useLoadingContext } from "../context/loading";

function Loading({ color }) {
  const { loading } = useLoadingContext();
  return (
    <>
      {loading && (
        <Flex
          position={"absolute"}
          w={"100%"}
          h={"100%"}
          bg={"rgba(0,0,0,0.4)"}
          zIndex={"9999"}
          justifyContent={"center"}
          alignItems={"center"}
          backdropFilter={"blur(4px) saturate(180%)"}
          cursor={"wait"}
          borderRadius={"0.8rem"}
        >
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
          >
            <Spinner color={color} />
            <Text
              color={color}
              fontWeight={700}
              fontSize={"1.3em"}
              className={"h-shadow-black"}
              fontFamily={"Philosopher !important"}
              mt={"10px"}
            >
              MetaBox
            </Text>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default Loading;
