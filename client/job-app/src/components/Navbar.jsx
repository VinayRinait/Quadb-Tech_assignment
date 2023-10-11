import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  const userData = localStorage.getItem("currentUser");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <Box bg="#002A53" py={4} px={[4, 8]} boxShadow="md" fontFamily="mono">
      <Flex
        justify="space-between"
        align="center"
        wrap={["wrap", "wrap", "nowrap"]}
      >
        <Link as={RouterLink} to={"/"} _hover={{ textDecoration: "none" }}>
          <Text fontSize={["xl", "2xl"]} fontWeight="bold" color="white">
            JobsHunter
          </Text>
        </Link>
        <Box display={["none", "none", "block"]}>
          <Link
            as={RouterLink}
            to="/"
            mr={4}
            fontSize="xl"
            color="whiteAlpha.800"
            _hover={{ textDecoration: "none", color: "whiteAlpha.900" }}
            fontWeight="semibold"
          >
            Home
          </Link>
          {user || isLoggedIn ? (
            <Link
              as={RouterLink}
              to="/profile"
              fontSize="xl"
              color="whiteAlpha.800"
              _hover={{ textDecoration: "none", color: "whiteAlpha.900" }}
              fontWeight="semibold"
            >
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link
              as={RouterLink}
              to="/authentication"
              fontSize="xl"
              color="whiteAlpha.800"
              _hover={{ textDecoration: "none", color: "whiteAlpha.900" }}
              fontWeight="semibold"
            >
              Login
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
