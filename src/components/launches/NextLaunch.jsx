import { Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../lib/utils";

export const NextLaunch = ({ launch }) => {
  const navigate = useNavigate();

  const goToLaunchDetails = () => {
    navigate(`/launches/${launch.id}`);
  };

  return (
    <Flex
      cursor={"pointer"}
      w={"container.lg"}
      h="300px"
      rounded={12}
      bgImage={
        "linear-gradient(90deg, rgba(226, 232, 240, 0.5), rgba(49, 130, 206, 0.5)), url('" +
        launch.links.mission_patch_small +
        "')"
      }
      boxShadow="dark-lg"
      bgSize={"contain"}
      bgRepeat={"no-repeat"}
      bgPosition={"center center"}
      px={24}
      justify={"space-between"}
      align={"center"}
      onClick={goToLaunchDetails}
    >
      <Flex flexDirection={"column"}>
        <Heading
          as="h1"
          size="lg"
          textTransform={"uppercase"}
          letterSpacing={"tighter"}
        >
          {launch.mission_name}
        </Heading>
        <Text>{formatDate(launch.launch_date_local)}</Text>
      </Flex>
      <Heading
        as="h1"
        size="lg"
        textTransform={"uppercase"}
        letterSpacing={"tighter"}
      >
        {launch.rocket.rocket_name}
      </Heading>
    </Flex>
  );
};
