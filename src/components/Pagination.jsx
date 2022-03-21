import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, Text } from "@chakra-ui/react";

export const Pagination = ({
  numberOfItems,
  itemsPerPage,
  offset,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(numberOfItems / itemsPerPage);
  const currentPage = offset / itemsPerPage === 0 ? 1 : offset / itemsPerPage;

  const disablePreviousPageButton = currentPage === 1;
  const disableNextPageButton = currentPage === numberOfPages;

  return (
    <Flex mt={12} w={"full"} alignItems={"center"} justify={"space-between"}>
      <Flex>
        <IconButton
          mr={2}
          disabled={disablePreviousPageButton}
          icon={<ChevronLeftIcon />}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </IconButton>
        {[...Array(numberOfPages).keys()].map((page, idx) => (
          <Button
            colorScheme={currentPage === page + 1 ? "blue" : "gray"}
            mx={1}
            key={idx}
            onClick={() => onPageChange(page + 1)}
          >
            {page + 1}
          </Button>
        ))}
        <IconButton
          ml={2}
          disabled={disableNextPageButton}
          icon={<ChevronRightIcon />}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </IconButton>
      </Flex>
      <Text>
        Page {currentPage} of {numberOfPages}
      </Text>
    </Flex>
  );
};
