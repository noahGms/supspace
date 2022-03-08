import { Flex, Heading, Link } from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom"

export const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      wrap="wrap"
      padding={6}
      color="white"
    >
      <Flex align="center" mr={5}>
        <ReactLink to={"/"}>
          <Link mr={6}>Home</Link>
        </ReactLink>
        <Heading as="h1" size="lg" textTransform={"uppercase"} letterSpacing={"tighter"}>
          🚀 Supspace
        </Heading>
        <ReactLink to={"/"}>
          <Link ml={6}>Launches</Link>
        </ReactLink>
      </Flex>
    </Flex>
  )
}