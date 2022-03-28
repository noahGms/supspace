import {
  Flex,
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Badge,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../components/layouts/Loading";
import { useEffect, useState } from "react";
import { spaceXApi } from "../lib/api";
import moment from "moment";

function CoreDetails() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [core, setCore] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCore = async () => {
    setLoading(false);
    const { data } = await spaceXApi.get(`core/${id}`);

    if (!data) {
      navigate("/");
    }

    setCore(data);
    setLoading(true);
  };

  useEffect(() => {
    (async () => {
      await getCore();
    })();
  }, []);

  if (!loading) {
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
            Core Details - {id}
          </Heading>
          <Flex
            mt={50}
            w={"full"}
            justify={"space-around"}
            alignSelf={"start"}
            flexDirection={"column"}
          >
            <Text>
              Orginal launch date:
              {moment(core.original_launch).format("MMMM Do YYYY, h:mm:ss a")}
            </Text>
            <Text>Water Landing: {core.water_landing.toString()}</Text>
            <Text>
              Status:
              <Badge ml={2}>{core.status}</Badge>
            </Text>
            <h3>Missions performed:</h3>
            <UnorderedList>
              {core.missions.map((mission) => {
                return <ListItem key={mission.flight}>{mission.name}</ListItem>;
              })}
            </UnorderedList>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CoreDetails;
