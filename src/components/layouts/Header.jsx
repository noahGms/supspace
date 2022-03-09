import { SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { RocketIncon } from "../icons/RocketIcon";

export const Header = () => {
  const { toggleColorMode } = useColorMode();
  const color = useColorModeValue("black", "white");

  return (
    <Flex flexDirection={"column"}>
      <Flex
        width="full"
        as="nav"
        align="center"
        justify="space-around"
        wrap="wrap"
        padding={6}
        color={color}
      >
        <Heading
          as="h1"
          size="lg"
          textTransform={"uppercase"}
          letterSpacing={"tighter"}
        >
          <ReactLink to={"/"}>
            <RocketIncon color={color} />
          </ReactLink>
        </Heading>
        <Box>
          <ReactLink to={"/launches"}>
            <Link ml={6}>Launches</Link>
          </ReactLink>
          <Button onClick={toggleColorMode} ml={2} variant={"ghost"}>
            <SunIcon></SunIcon>
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};
