import { Flex, Heading, Link } from "@chakra-ui/react"

export const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="center"
      wrap="wrap"
      padding={6}
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="p" size="xs" fontWeight={"normal"} letterSpacing={"tighter"}>
          © SUPSPACE - All rights reverved - <Link><a href="https://github.com/noahGms" target="_blank">@noahGms</a></Link>
        </Heading>
      </Flex>
    </Flex>
  )
}