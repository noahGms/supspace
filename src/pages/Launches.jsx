import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Launch } from "../components/launches/Launch";
import { Loading } from "../components/layouts/Loading";
import { spaceXApi } from "../lib/api";
import { Pagination } from "../components/Pagination";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

function Launches() {
  const [launches, setLaunches] = useState([]);
  const [totalLaunches, setTotalLaunches] = useState(0);
  const [launchesLoading, setLaunchesLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const orderByDate = useRef("desc");
  const [search, setSearch] = useState(null);
  const [searching, setSearching] = useState(false);
  const [allLaunches, setAllLaunches] = useState([]);
  const [launchesSearch, setLaunchesSearch] = useState([]);

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
      `/launches?offset=${offset}&limit=10&order=${orderByDate.current}&sort=launch_date_utc`
    );
    setLaunches(data);
    setLaunchesLoading(true);
  };

  const getTotalLaunches = async () => {
    setLaunchesLoading(false);
    const { data } = await spaceXApi.get("launches");
    setAllLaunches(data);
    setTotalLaunches(data.length);
    setLaunchesLoading(true);
  };

  const onSelectOrderByDateChange = (e) => {
    orderByDate.current = e.target.value;
    getLaunches(currentPage);
  };

  const handleSearch = () => {
    setSearching(true);
    setLaunchesLoading(false);
    setLaunchesSearch(
      allLaunches.filter((launch) => {
        return launch.mission_name.includes(search);
      })
    );
    setLaunchesLoading(true);
  };

  const resetSearch = () => {
    setSearching(false);
    setSearch(null);
    setLaunchesSearch([]);
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
            <FormControl w={"auto"}>
              <FormLabel>Filter by date</FormLabel>
              <Select
                disabled={searching}
                onChange={(e) => onSelectOrderByDateChange(e)}
                defaultValue={orderByDate.current}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </Select>
            </FormControl>
            <FormControl w={"xl"} ml={3}>
              <FormLabel>Search mission</FormLabel>
              <InputGroup>
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ex: STARLINK-11 (V1.0)"
                />
                <InputRightElement
                  children={
                    <>
                      {searching ? (
                        <IconButton
                          onClick={resetSearch}
                          icon={<CloseIcon />}
                        />
                      ) : (
                        <IconButton onClick={handleSearch}>
                          <SearchIcon />
                        </IconButton>
                      )}
                    </>
                  }
                />
              </InputGroup>
            </FormControl>
          </Flex>

          {!searching ? (
            <>
              {launches.map((launch, idx) => (
                <Launch key={idx} launch={launch} />
              ))}
            </>
          ) : (
            <>
              {launchesSearch.map((launch, idx) => (
                <Launch key={idx} launch={launch} />
              ))}

              {launchesSearch.length === 0 && (
                <Alert rounded={6} mt={4} status="info">
                  <AlertIcon />
                  No launch found
                </Alert>
              )}
            </>
          )}

          {!searching && (
            <Pagination
              numberOfItems={totalLaunches}
              itemsPerPage={10}
              onPageChange={async (page) => await getLaunches(page)}
              page={currentPage}
            />
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Launches;
