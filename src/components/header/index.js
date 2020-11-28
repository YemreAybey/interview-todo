import { Box, Flex, Heading } from "rebass";

const Header = () => {
  return (
    <Flex
      maxWidth={1300}
      margin="0 auto"
      px={20}
      width={1}
      height={[60, 120]}
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading fonstSize={[16, 20, 24]}>TODOS</Heading>
      <Box>
        <i class="fas fa-clipboard-list fa-5x"></i>
      </Box>
    </Flex>
  );
};

export default Header;
