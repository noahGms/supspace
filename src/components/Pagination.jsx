import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, Text } from "@chakra-ui/react";

export const Pagination = ({
  numberOfItems,
  itemsPerPage,
  onPageChange,
  page,
}) => {
  const numberOfPages = Math.ceil(numberOfItems / itemsPerPage);
  const currentPage = page;

  const disablePreviousPageButton = currentPage === 1;
  const disableNextPageButton = currentPage === numberOfPages;

  const pagesArray = Array.from({ length: numberOfPages }, (_, i) => i + 1);

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
        {pagesArray.map((page, idx) => (
          <Button
            colorScheme={currentPage === page ? "blue" : "gray"}
            mx={1}
            key={idx}
            onClick={() => onPageChange(page)}
          >
            {page}
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
