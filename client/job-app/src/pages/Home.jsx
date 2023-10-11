import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Button,
  Spinner,
  Image,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchJobData } from "../redux/job/job.action";
import Authentication from "./Authentication";
import { programmingLanguages } from "../Languages/ProgrammingLanguages";
import img from "../images/eric-prouzet-B3UFXwcVbc4-unsplash.jpg";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem("currentUser");

  const jobs = useAppSelector((store) => store.jobReducer.job);
  const dispatch = useAppDispatch();

  const handleLanguageSelect = (event) => {
    setSelectedLanguage(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchJobData(selectedLanguage));
  }, [dispatch, selectedLanguage]);

  const viewJobs = async () => {
    if (selectedLanguage) {
      try {
        setLoading(true);
        navigate("/job-page", {
          state: { jobs, selectedLanguage },
        });
      } catch (error) {
        console.error("Error fetching job listings:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Flex p={4} align="center" justify="center">
      <Flex direction="column" alignItems="center" justifyContent="center">
        {user || isLoggedIn ? (
          <>
            <Heading mb={4}>Find Jobs</Heading>
            <Text mb={4} textAlign="center">
              Select a programming language and find job listings.
            </Text>
            <FormControl mb={4}>
              <FormLabel>Select a Programming Language:</FormLabel>
              <Select
                placeholder="Choose a language"
                onChange={handleLanguageSelect}
                value={selectedLanguage}
              >
                {programmingLanguages.map((el, index) => (
                  <option key={index} value={el}>
                    {el}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button onClick={viewJobs} isLoading={loading} bg="#002A53" color="white">
              {loading ? <Spinner size="sm" color="white" /> : "View Jobs"}
            </Button>
          </>
        ) : (
          <Authentication setIsLoggedIn={setIsLoggedIn} />
        )}
      </Flex>
      <Box ml={4} width="40%">
        <Image
          src={img} // Replace with the actual image URL
          alt="Your Image"
          borderRadius="md" // Add rounded corners
        />
      </Box>
    </Flex>
  );
};

export default Home;
