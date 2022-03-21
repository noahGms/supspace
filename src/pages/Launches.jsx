import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Launch } from "../components/launches/Launch";
import { Loading } from "../components/layouts/Loading";
import { spaceXApi } from "../lib/api";
import { Pagination } from "../components/Pagination";

function Launches() {
  const [launches, setLaunches] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [totalLaunches, setTotalLaunches] = useState(0);
  const [launchesLoading, setLaunchesLoading] = useState(false);

  const getLaunches = async (page) => {
    setLaunchesLoading(false);

    if (page !== 0) {
      setCurrentOffset(page * 10);
    }

    const { data } = await spaceXApi.get(
      "launches?limit=10&offset=" + currentOffset
    );
    setLaunches(data);
    setLaunchesLoading(true);
  };

  const getTotalLaunches = async () => {
    setLaunchesLoading(false);
    const { data } = await spaceXApi.get("launches");
    setTotalLaunches(data.length);
    setLaunchesLoading(true);
  };

  useEffect(() => {
    (async () => {
      await getTotalLaunches();
      await getLaunches(0);
    })();
  }, []);

  if (!launchesLoading) {
    return <Loading />;
  }

  return (
    <Box mb={50}>
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
            mb={12}
          >
            Launches
          </Heading>
          {launches.map((launch, idx) => (
            <Launch key={idx} launch={launch} />
          ))}
          <Pagination
            numberOfItems={totalLaunches}
            itemsPerPage={10}
            offset={currentOffset}
            onPageChange={getLaunches}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Launches;
