import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

function WidgetThemeSection() {
  const list = [
    {
      title: "Purple",
      img: "box-sample-purple.webp",
    },
    {
      title: "White",
      img: "box-sample-purple.webp",
    },
    {
      title: "Black",
      img: "box-sample-purple.webp",
    },
  ];
  return (
    <Box align={"center"} mt={"13rem"}>
      <Heading fontSize={"60px"} lineHeight={"80px"}>
        Built to be bespoke
      </Heading>

      <Flex
        justifyContent={"space-around"}
        alignItems={"center"}
        w={"75%"}
        mt={"5em"}
      >
        {list.map((list, index) => {
          return (
            <Box className="glass" p={"16px"} key={index}>
              {" "}
              <Image
                height={200}
                width={300}
                src={`/assets/${list.img}`}
              />{" "}
              <Flex alignItems={"center"} mt={"2em"}>
                <Box
                  h={"10px"}
                  w={"10px"}
                  bg={"rgb(243, 254, 156)"}
                  mr={"0.5em"}
                ></Box>
                <Text textAlign={"left"} fontWeight={600}>
                  {list.title}
                </Text>
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
}

export default WidgetThemeSection;
