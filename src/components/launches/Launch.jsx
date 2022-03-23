import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { getRandomNumber } from "../../lib/utils";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const Launch = ({ launch }) => {
  const navigate = useNavigate();

  const goToLaunchDetails = () => {
    navigate(`/launches/${launch.id}`);
  };

  const getImage = () => {
    if (launch.links.flickr_images.length === 0) {
      return launch.links.mission_patch_small;
    } else {
      const length = launch.links.flickr_images.length;
      return launch.links.flickr_images[getRandomNumber(0, length - 1)];
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
      cursor={"pointer"}
      onClick={goToLaunchDetails}
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
          {launch.mission_name}
        </Heading>
        <Text color={"white"}>
          {moment(launch.launch_date_local).format("MMMM Do YYYY, h:mm:ss a")}
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
          {launch.rocket.rocket_name}
        </Heading>
      </Flex>
    </Flex>
  );
};
