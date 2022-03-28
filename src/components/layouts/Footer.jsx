import { Flex, Heading, Link } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex as="footer" align="center" justify="center" wrap="wrap" padding={6}>
      <Flex align="center" mr={5}>
        <Heading
          as="p"
          size="xs"
          fontWeight={"normal"}
          letterSpacing={"tighter"}
        >
          © SUPSPACE - All rights reverved -{" "}
          <Link href="https://github.com/noahGms" isExternal>
            @noahGms
          </Link>
        </Heading>
      </Flex>
    </Flex>
  );
};
