import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setPagination } from "../redux/job/job.action";
import Job from "../types/types";

const calculateLPA = (minSalary, maxSalary) => {
  const minLPA = (minSalary * 12) / 100000;
  const maxLPA = (maxSalary * 12) / 100000;
  return `₹${minLPA.toFixed(1)} LPA to ₹${maxLPA.toFixed(1)} LPA`;
};

const getContractType = (contract_time) => {
  return contract_time ? "Full Time" : "Part Time";
};

const JobCard = ({ job, navigate }) => (
  <Box
    p={4}
    borderWidth="1px"
    borderRadius="lg"
    boxShadow="md"
    bg="white"
    transition="transform 0.2s"
    _hover={{ transform: "scale(1.05)" }}
  >
    <Heading size="lg">{job.title}</Heading>
    <Text mt={2} fontSize="sm" color="gray.600">
      {job.company.display_name}
    </Text>
    <Text fontSize="md" fontWeight="semibold" color="teal.600">
      {calculateLPA(job.salary_min, job.salary_max)}
    </Text>
    <Text fontSize="md" color="gray.500">
      Contract: {getContractType(job.contract_time)}
    </Text>
    <Button
      mt={4}
      bg="#002A53"
      size="sm"
      color="white"
      onClick={() =>
        navigate(`/job-details`, {
          state: { currentJob: job },
        })
      }
    >
      View Details
    </Button>
  </Box>
);

const JobPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedLanguage } = location.state || {};
  const jobs = useAppSelector((state) => state.jobReducer.job);
  const currentPage = useAppSelector((state) => state.jobReducer.currentPage);
  const itemsPerPage = useAppSelector((state) => state.jobReducer.itemsPerPage);

  const dispatch = useAppDispatch();

  const handlePerPageChange = (event) => {
    const perPage = parseInt(event.target.value, 10);
    dispatch(setPagination(1, perPage)); // Reset to the first page when perPage changes
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    dispatch(setPagination(nextPage, itemsPerPage));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      dispatch(setPagination(prevPage, itemsPerPage));
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const jobsToDisplay = jobs.slice(startIndex, endIndex);

  return (
    <Box p={4}>
      <Center>
        <Heading mb={4} size="xl">Job Listings for {selectedLanguage}</Heading>
      </Center>
      <Box mb={4} textAlign="center">
        <label htmlFor="perPageSelect" style={{ fontSize: "1rem", fontWeight: "bold" }}>
          Items per page:
        </label>
        <select
          id="perPageSelect"
          value={itemsPerPage}
          onChange={handlePerPageChange}
        >
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
      </Box>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {jobsToDisplay && jobsToDisplay.length > 0 ? (
          jobsToDisplay.map((job) => (
            <JobCard key={job.id} job={job} navigate={navigate} />
          ))
        ) : (
          <Text fontSize="lg" color="gray.600" textAlign="center">No job listings found for {selectedLanguage}.</Text>
        )}
      </SimpleGrid>
      <Button mt={4} bg="#002A53"
      size="sm"
      color="white" onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous Page
      </Button>
      <Button
        mt={4}
        bg="#002A53"
        size="sm"
        color="white"
        ml={2}
        onClick={handleNextPage}
        disabled={endIndex >= jobs.length}
      >
        Next Page
      </Button>
    </Box>
  );
};

export default JobPage;
