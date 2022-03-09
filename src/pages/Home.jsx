import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { spaceXApi } from "../lib/api";
import { NextLaunch } from "../components/launches/NextLaunch";
import { PreviousLaunch } from "../components/launches/PreviousLaunch";
import { Loading } from "../components/layouts/Loading";

function Home() {
  const [nextLaunchLoading, setNextLaunchLoading] = useState(false);
  const [nextLaunch, setNextLaunch] = useState({});
  const [previousLaunchesLoding, setPreviousLaunchesLoading] = useState(false);
  const [previousLaunches, setPreviousLaunches] = useState([]);

  useEffect(() => {
    const nextLaunch = async () => {
      const { data } = await spaceXApi.get("launch-next");
      setNextLaunch(data);
      setNextLaunchLoading(true);
    };

    const previousLaunches = async () => {
      const { data } = await spaceXApi.get("launches-past?limit=3");
      setPreviousLaunches(data);
      setPreviousLaunchesLoading(true);
    };

    nextLaunch();
    previousLaunches();
  }, []);

  if (!nextLaunchLoading || !previousLaunchesLoding) {
    return <Loading />;
  }

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
            Supspace
          </Heading>
          <Text mt={2}>An web app to show launches of SpaceX</Text>
        </Flex>
        <NextLaunch launch={nextLaunch} />
        <Heading textTransform={"uppercase"} size={"lg"} mt={12} mb={6}>
          Previous launches
        </Heading>
        {previousLaunches.map((launch, idx) => (
          <PreviousLaunch key={idx} previousLaunch={launch} />
        ))}
      </Flex>
    </Box>
  );
}

export default Home;
