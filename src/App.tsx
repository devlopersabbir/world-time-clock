import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { cities } from "./utils/_data";
import { ICity } from "./utils/interface";
import Times from "./components/Times";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper";

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
  console.log(timeZoon);
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
      >
        <Swiper modules={[Pagination, Navigation]}>
          <SwiperSlide>
            <Times currentTime={time} key="1" />
          </SwiperSlide>
          <SwiperSlide>
            <Times currentTime={time} key="1" />
          </SwiperSlide>
          <SwiperSlide>
            <Times currentTime={time} key="1" />
          </SwiperSlide>
        </Swiper>
      </Flex>
    </Container>
  );
};

export default App;
