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
  const [totalLaunches, setTotalLaunches] = useState(0);
  const [launchesLoading, setLaunchesLoading] = useState(false);
  const [orderByDate, setOrderByDate] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const getLaunches = async (page) => {
    setLaunchesLoading(false);
    setCurrentPage(page);

    let offset = null;
    if (page === 1) {
      offset = 0;
    } else {
      offset = page * 10 - 10;
    }

    const { data } = await spaceXApi.get(
      `/launches?offset=${offset}&limit=10&order=${orderByDate}&sort=launch_date_utc`
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
    getLaunches(currentPage);
  };

  useEffect(() => {
    (async () => {
      await getTotalLaunches();
      await getLaunches(currentPage);
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
            onPageChange={async (page) => await getLaunches(page)}
            page={currentPage}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Launches;
