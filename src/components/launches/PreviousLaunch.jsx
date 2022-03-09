import { Flex, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import { getRandomNumber } from "../../lib/utils";

export const PreviousLaunch = ({ previousLaunch }) => {
  const getImage = () => {
    if (previousLaunch.links.flickr_images.length === 0) {
      return previousLaunch.links.mission_patch_small;
    } else {
      const length = previousLaunch.links.flickr_images.length;
      return previousLaunch.links.flickr_images[getRandomNumber(0, length - 1)];
    }
  };

  return (
    <Flex
      mt={6}
      boxShadow="dark-lg"
      bgImage={
        "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)) , url(' " +
        getImage() +
        "')"
      }
      backgroundPosition={"center center"}
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
      w={"container.lg"}
      height={"100px"}
      p={12}
      rounded={6}
      justifyContent={"space-between"}
    >
      <Flex
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"start"}
      >
        <Heading
          color={"white"}
          as="h1"
          size="lg"
          textTransform={"uppercase"}
          letterSpacing={"tighter"}
        >
          {previousLaunch.mission_name}
        </Heading>
        <Text color={"white"}>
          {moment(previousLaunch.launch_date_local).format(
            "MMMM Do YYYY, h:mm:ss a"
          )}
        </Text>
      </Flex>
      <Flex
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"start"}
      >
        <Heading
          color={"white"}
          as="h1"
          size="lg"
          textTransform={"uppercase"}
          letterSpacing={"tighter"}
        >
          {previousLaunch.rocket.rocket_name}
        </Heading>
      </Flex>
    </Flex>
  );
};
