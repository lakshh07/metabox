import { Box, Divider, Flex, Heading, Tag, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function NftsSection() {
  const router = useRouter();

  const nftData = [];

  return (
    <Box className={"nft-section-bg"} mx={"5rem"} py={"10rem"}>
      <Heading fontWeight={600}>
        ✨ <span style={{ fontWeight: 400 }}>Editor&apos;s</span> Pick
      </Heading>

      <Flex>
        {nftData.map((list, index) => {
          return (
            // <Link href={`/marketplace/nfts/${index}`} key={index}>
            <Box
              bg={"#35343B"}
              // key={index}
              p={"1em"}
              m={"1em"}
              borderRadius={"10px"}
              cursor={"pointer"}
              onClick={() => router.push(`/marketplace/nfts/${index}`)}
            >
              {/* <Flex alignItems={"center"}>
                <Box borderRadius={"50px"} overflow={"hidden"}>
                  <Image
                    height={40}
                    width={40}
                    src={
                      "https://ipfs.io/ipfs/QmPsN7hVArJz3GhUjKpYuHGGFBtaxV5BcQMEDNEEo5VzpX/FKhoO37akAEz2aB.gif"
                    }
                  />
                </Box>

                <Text fontWeight={500} ml={"1em"}>
                  {list.owner}
                </Text>
              </Flex> */}
              <Box
                borderRadius={"10px"}
                overflow={"hidden"}
                align={"center"}
                mt={"1.2em"}
                h={300}
              >
                <Image height={200} width={300} src={list.img} />
              </Box>

              <Flex
                alignItems={"flex-start"}
                justifyContent={"space-between"}
                my={"1.2em"}
                flexDirection={"column"}
              >
                <Heading fontWeight={500} fontSize={"1.5em"} mb={"0.4em"}>
                  {list.title}
                </Heading>
                <Tag bg={"gray"} color={"#f5f5f5"} fontSize={"0.8em"}>
                  {list.type}
                </Tag>
              </Flex>

              <Divider w={"100%"} mx={"auto"} opacity={"0.2"} mb={"1.2em"} />
              <Flex alignItems={"center"}>
                <Box rounded={"50px"} mr={"1em"}>
                  <Image height={30} width={30} src={"/assets/eth.png"} />
                </Box>

                <Box>
                  <Text opacity={"0.5"} fontSize={"12px"} fontWeight={500}>
                    {list.type === "Fixed" ? "Instant Price" : "Highest Bid"}
                  </Text>
                  <Text fontWeight={600}>{list.price}</Text>
                </Box>
              </Flex>
            </Box>
            // </Link>
          );
        })}
      </Flex>
    </Box>
  );
}

export default NftsSection;
