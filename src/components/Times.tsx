import { Box, Heading } from "@chakra-ui/react";

interface ITimes {
  currentTime: string;
}

const Times = ({ currentTime }: ITimes) => {
  return (
    <Box
      borderRadius="2xl"
      // bg="gray.300"
      shadow="0 0 10px rgba(0, 0, 0, 0.2)"
      style={{
        backdropFilter: "blur(10px)",
        background:
          "linear-gradient(rgb(241 241 241 / 23%), rgb(255 255 255 / 13%))",
      }}
      mx="auto"
      my={5}
      px={5}
      py={8}
    >
      <Heading
        _selection={{ userSelect: "none" }}
        fontWeight="bold"
        color="orange.400"
        fontSize="5xl"
      >
        {currentTime}
      </Heading>
    </Box>
  );
};

export default Times;
