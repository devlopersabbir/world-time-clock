import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { cities } from "./utils/_data";
import { ICity } from "./utils/interface";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

const App = () => {
  const [time, setTime] = useState<string>("");
  const [timeZone, setTimeZone] = useState<string>("America/New_York");
  const [currentCityIndex, setCurrentCityIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleString("en-US", {
          timeZone: timeZone,
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
  }, [timeZone]);

  useEffect(() => {
    const handleTransitionEnd = () => {
      setSlideDirection(undefined);
    };

    if (boxRef.current) {
      boxRef.current.addEventListener("transitionend", handleTransitionEnd);
    }

    return () => {
      if (boxRef.current) {
        boxRef.current.removeEventListener(
          "transitionend",
          handleTransitionEnd
        );
      }
    };
  }, []);

  const handleCityChange = (index: number) => {
    setSlideDirection(index < currentCityIndex ? "left" : "right");
    setCurrentCityIndex(index);
    setTimeZone(cities[index].timezone);
  };

  const handleSlideLeft = () => {
    const newIndex = (currentCityIndex - 1 + cities.length) % cities.length;
    handleCityChange(newIndex);
  };

  const handleSlideRight = () => {
    const newIndex = (currentCityIndex + 1) % cities.length;
    handleCityChange(newIndex);
  };

  return (
    <>
      <Container
        fontFamily="Kalam"
        h="auto"
        maxW="500px"
        w="500px"
        mx="auto"
        p={4}
        rounded="2xl"
        boxShadow="2xl"
      >
        <HStack spacing={2} align="center" justify="space-between">
          {cities?.map((city: ICity, index: number) => (
            <Button
              onClick={() => handleCityChange(index)}
              key={index}
              variant="outline"
              colorScheme="blue"
              fontWeight="semibold"
              fontSize="lg"
              isActive={currentCityIndex === index}
            >
              {city.name}
            </Button>
          ))}
        </HStack>
        <Flex
          p={7}
          my={2}
          h="64"
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
            aria-label="left"
            colorScheme="purple"
            cursor="pointer"
            as={BsFillCaretLeftFill}
            zIndex={999}
            onClick={handleSlideLeft}
          />

          {/* slider content start */}
          <Box
            ref={boxRef}
            w="60"
            animation="ease-in-out"
            transitionDelay="0.5s"
            zIndex={9}
            borderRadius="2xl"
            shadow="0 0 10px rgba(0, 0, 0, 0.2)"
            style={{
              backdropFilter: "blur(10px)",
              background:
                "linear-gradient(rgb(241 241 241 / 23%), rgb(255 255 255 / 13%))",
              transform:
                slideDirection === "left"
                  ? "translateX(-100%)"
                  : slideDirection === "right"
                  ? "translateX(100%)"
                  : undefined,
              opacity: slideDirection ? 0 : 1,
              transition:
                "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
            }}
            mx="auto"
            my={5}
            px={5}
            py={8}
          >
            <Heading
              animation="ease-in-out"
              transitionDelay="0.5s"
              _selection={{ userSelect: "none" }}
              fontWeight="bold"
              color="orange.400"
              fontSize="5xl"
            >
              {time}
            </Heading>
          </Box>
          {/* slider content end */}

          {/* right button */}
          <IconButton
            zIndex={9999}
            position="absolute"
            right={16}
            cursor="pointer"
            colorScheme="purple"
            aria-label="right"
            as={BsFillCaretRightFill}
            onClick={handleSlideRight}
          />
        </Flex>
        <Divider />
        <VStack pt={4} gap={0}>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            colorScheme="orange"
            textAlign="center"
          >
            Extension Version
          </Text>
          <Text colorScheme="teal" fontSize="xs" fontWeight="normal">
            0.0.1
          </Text>
        </VStack>
      </Container>
    </>
  );
};

export default App;
