import { Box, Container, Divider, Link, Text } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <>
      <Box py={"1rem"} w={"100%"} pb={"2rem"} pt={"10rem"}>
        <Text
          textAlign={"center"}
          fontSize={"1rem"}
          color={"rgba(243, 254, 156, 1)"}
          fontWeight={500}
          letterSpacing={"2px"}
        >
          Build with 💜 by{" "}
          <Link isExternal href="https://twitter.com/LakshayMaini_">
            Lakshay
          </Link>
        </Text>
      </Box>
    </>
  );
}

export default Footer;
