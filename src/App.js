import { Box } from "rebass";
import Header from "./components/header";
import { GlobalStyle } from "./theme";

const App = () => {
  return (
    <Box
      minWidth="100vw"
      minHeight="100vh"
      width={1}
      height={1}
      css={{
        background:
          "linear-gradient(to right top, #be93c5, #a2a3d9, #86b2df, #76bdda, #7bc6cc)",
      }}
    >
      <GlobalStyle />
      <Header />
    </Box>
  );
};

export default App;
