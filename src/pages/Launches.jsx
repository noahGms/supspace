import { Box, Flex, Heading } from "@chakra-ui/react";

function Launches() {
  return (
    <Box mb={100}>
      <Flex flexDirection={"column"} align={"center"} justify={"center"}>
        <Flex
          mb={24}
          mt={12}
          justify={"center"}
          align={"center"}
          flexDirection={"column"}
        >
          <Heading
            as="h1"
            size="3xl"
            textTransform={"uppercase"}
            letterSpacing={"tighter"}
          >
            Launches
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Launches;
