import { Box, Heading } from "@chakra-ui/react";

interface ITimes {
  currentTime: string;
}

const Times = ({ currentTime }: ITimes) => {
  return (
    <Heading
      _selection={{ userSelect: "none" }}
      fontWeight="bold"
      color="orange.400"
      fontSize="5xl"
    >
      {currentTime}
    </Heading>
  );
};

export default Times;
