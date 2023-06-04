import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { cities } from "./utils/_data";
import { ICity } from "./utils/interface";
import Times from "./components/Times";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

const App = () => {
  const [time, setTime] = useState<string>("");
  const [timeZoon, setTimeZooon] = useState<string>("America/New_York");
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleString("en-US", {
          timeZone: timeZoon,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeZoon]);

  const [slideIndex, setSlideIndex] = useState<number>(1);
  const nextSlide = () => {};
  const prevSlide = () => {};
  return (
    <Container
      fontFamily="Kalam"
      h="auto"
      maxW="500px"
      w="500px"
      mx="auto"
      p={4}
      rounded="2xl"
      border="2px"
      boxShadow="2xl"
    >
      <HStack spacing={2} align="center" justify="space-between">
        {cities?.map((city: ICity, index: number) => (
          <Button
            onClick={() => setTimeZooon(city?.timezone)}
            key={index}
            variant="outline"
            colorScheme="blue"
            fontWeight="semibold"
            fontSize="xl"
          >
            {city.name}
          </Button>
        ))}
      </HStack>
      <Flex
        p={7}
        my={2}
        w="full"
        align="center"
        style={{
          backgroundImage: `url('/bgimage.png')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        overflow="hidden"
        gap="32"
        justify="center"
        position="relative"
      >
        {/* left button */}
        <IconButton
          position="absolute"
          left={16}
          onClick={prevSlide}
          aria-label="left"
          colorScheme="purple"
          cursor="pointer"
          as={BsFillCaretLeftFill}
          zIndex={999}
        />

        {cities.map((_: ICity, i: number) => (
          // slider content start
          <Box
            visibility="unset"
            w="full"
            animation="ease-in-out"
            transitionDelay="0.3s"
            zIndex={9}
            borderRadius="2xl"
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
              animation="ease-in-out"
              transitionDelay="0.3s"
              key={i}
              _selection={{ userSelect: "none" }}
              fontWeight="bold"
              color="orange.400"
              fontSize="5xl"
            >
              {time}
            </Heading>
          </Box>
          // slider content end
        ))}
        {/* right button */}
        <IconButton
          zIndex={9999}
          position="absolute"
          right={16}
          onClick={nextSlide}
          cursor="pointer"
          colorScheme="purple"
          aria-label="right"
          as={BsFillCaretRightFill}
        />
      </Flex>
    </Container>
  );
};

export default App;
