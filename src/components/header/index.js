import { Box, Flex, Heading } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <Flex
      maxWidth={1300}
      margin="0 auto"
      px={20}
      width={1}
      height={120}
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading fontFamily="Roboto" fonstSize={[4, 5, 6]}>
        TODOS
      </Heading>
      <Box>
        <FontAwesomeIcon icon={faClipboardList} size="4x" />
      </Box>
    </Flex>
  );
};

export default Header;
