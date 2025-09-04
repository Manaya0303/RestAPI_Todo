import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import TaskList from "./components/TaskList"

const theme = extendTheme({
  fonts: {
    heading: "'M PLUS Rounded 1c', sans-serif",
    body: "'M PLUS Rounded 1c', sans-serif",
  },
});

function App() {
  return (
    <>
      <Box
        bgColor="gray.50"
        maxW="container.md" 
        mx="auto"
        p={6}
        theme={theme}
      >
        <TaskList />
      </Box>
    </>
  );
};

export default App;