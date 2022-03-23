import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
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
  const [orderByDate, setOrderByDate] = useState("desc");

  const getLaunches = async (page) => {
    setLaunchesLoading(false);

    if (page !== 0) {
      setCurrentOffset(page * 10);
    }

    const { data } = await spaceXApi.get(
      `/launches?offset=${currentOffset}&limit=10&order=${orderByDate}&sort=launch_date_utc`
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

  const onSelectOrderByDateChange = (e) => {
    setOrderByDate(e.target.value);
    getLaunches(0);
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

          <Flex alignSelf={"start"}>
            <FormControl>
              <FormLabel>Filter by date</FormLabel>
              <Select onChange={(e) => onSelectOrderByDateChange(e)}>
                <option
                  value="desc"
                  selected={orderByDate === "desc" ? true : false}
                >
                  Descending
                </option>
                <option
                  value="asc"
                  selected={orderByDate === "asc" ? true : false}
                >
                  Ascending
                </option>
              </Select>
            </FormControl>
          </Flex>

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
