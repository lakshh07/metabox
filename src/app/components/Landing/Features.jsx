import { Badge, Box, Flex, Grid, Heading, Tag, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

function Features() {
  const list = [
    {
      title: "Built-In Bridging",
      subheading: "Cross-Chain Minting",
      img: "m1",
      bg: "rgba(199, 172, 255, 1)",
    },
    {
      title: "Automatic Swaps",
      subheading: "Cost-Efficient Exchange",
      img: "m2",
      bg: "rgba(255, 202, 164, 1)",
    },
    {
      title: "Secondary Sales",
      subheading: "Localized Listings",
      img: "m3",
      bg: "rgba(209, 242, 121, 1)",
      status: "coming soon",
    },
  ];

  return (
    <Box align={"center"} my={"13rem"}>
      <Heading fontSize={"60px"} lineHeight={"80px"}>
        What&apos;s in the MetaBox?
      </Heading>

      <Grid
        mt="3em"
        mx="7.5%"
        templateColumns="repeat(3, 1fr)"
        gap={6}
        alignItems="center"
        justifyContent="center"
        fontSize="1.5em"
        fontFamily="Montserrat"
      >
        {list.map((list, index) => {
          return (
            <Flex
              w="400px"
              alignItems="center"
              py="2em"
              px="1em"
              rounded="10px"
              bg="#35343B"
              justifyContent="center"
              key={index}
              className="m-bg"
            >
              <Box flex="2" align="center" position={"relative"}>
                <Heading
                  fontSize="1.3em"
                  fontFamily="Montserrat"
                  fontWeight="500"
                >
                  {list.title}
                  <br />
                  {list.status && (
                    <Badge
                      fontSize={"8px"}
                      right={"0"}
                      top={"-10px"}
                      position={"absolute"}
                    >
                      {list.status}
                    </Badge>
                  )}
                </Heading>

                <Tag mt="15px" fontSize="0.7em" bg={list.bg}>
                  {list.subheading}
                </Tag>
              </Box>
            </Flex>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Features;
