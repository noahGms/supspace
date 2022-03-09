import { Flex, Spinner } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Flex align={"center"} justify={"center"}>
      <Spinner size={"lg"} />
    </Flex>
  );
};
