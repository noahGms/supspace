import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { spaceXApi } from "../lib/api";
import { Loading } from "../components/layouts/Loading";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Tag,
  IconButton,
} from "@chakra-ui/react";
import { formatDate, getRandomNumber } from "../lib/utils";
import { Link as ReactLink } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function LaunchDetails() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(false);

  const getImage = () => {
    if (launch.links.flickr_images.length === 0) {
      return launch.links.mission_patch_small;
    } else {
      const length = launch.links.flickr_images.length;
      return launch.links.flickr_images[getRandomNumber(0, length - 1)];
    }
  };

  const getLaunch = async () => {
    setLoading(false);
    const { data } = await spaceXApi.get(`launch/${id}`);

    if (!data) {
      navigate("/");
    }

    setLaunch(data);
    setLoading(true);
  };

  useEffect(() => {
    (async () => {
      await getLaunch();
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
            Launch - {launch.mission_name}
          </Heading>
          <Flex mt={50} w={"full"} justify={"space-around"} alignSelf={"start"}>
            <Flex px={10} flexDirection={"column"}>
              <Heading
                as="h1"
                size="xl"
                letterSpacing={"tighter"}
                fontWeight={"normal"}
                mb={12}
              >
                Details
              </Heading>
              <Text>Site ID: {launch.launch_site.site_id}</Text>
              <Text>Mission name: {launch.mission_name}</Text>
              <Text>Rocket: {launch.rocket.rocket_name}</Text>
              <Text>Site name long: {launch.launch_site.site_name_long}</Text>
              <Text>Site name: {launch.launch_site.site_name}</Text>
              <Text>Launch date UTC: {formatDate(launch.launch_date_utc)}</Text>
              <Text>
                Successful/failed launch:{" "}
                {launch.launch_success ? (
                  <Tag colorScheme={"green"}>Successful</Tag>
                ) : (
                  <Tag colorScheme={"red"}>Failed</Tag>
                )}
              </Text>

              {launch.rocket.first_stage.cores.map((core, idx) => (
                <Box key={idx} mt={12}>
                  <Heading
                    as="h2"
                    size="lg"
                    letterSpacing={"tighter"}
                    fontWeight={"normal"}
                    mb={6}
                  >
                    First stage {core.core.id}{" "}
                    {core.core.missions.length > 1 && (
                      <ReactLink to={`/cores/${core.core.id}`}>
                        <IconButton
                          variant={"link"}
                          icon={<ExternalLinkIcon fontSize={"2xl"} />}
                        ></IconButton>
                      </ReactLink>
                    )}
                  </Heading>
                  <Text>
                    Water Landing:{" "}
                    <Tag
                      colorScheme={core.core.water_landing ? "green" : "red"}
                    >
                      {core.core.water_landing.toString()}
                    </Tag>
                  </Text>
                  <Text>
                    Original landing: {formatDate(core.core.original_launch)}
                  </Text>
                </Box>
              ))}
            </Flex>
            <Image
              boxSize="300px"
              objectFit="contain"
              src={getImage()}
              alt="launch image"
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default LaunchDetails;
