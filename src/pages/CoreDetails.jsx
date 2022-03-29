import {
  Flex,
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Badge,
  Link,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../components/layouts/Loading";
import { useEffect, useState } from "react";
import { spaceXApi } from "../lib/api";
import { formatDate } from "../lib/utils";
import { Link as ReactLink } from "react-router-dom";

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
            <Text>Orginal launch date: {formatDate(core.original_launch)}</Text>
            <Text>
              Water Landing:{" "}
              <Badge colorScheme={core.water_landing ? "green" : "red"}>
                {core.water_landing.toString()}
              </Badge>
            </Text>
            <Text>
              Status:
              <Badge ml={2}>{core.status}</Badge>
            </Text>
            <h3>Missions performed:</h3>
            <UnorderedList>
              {core.missions.map((mission) => {
                return (
                  <ListItem key={mission.flight}>
                    <Link as={ReactLink} to={`/launches/${mission.flight}`}>
                      {mission.name}
                    </Link>
                  </ListItem>
                );
              })}
            </UnorderedList>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CoreDetails;
