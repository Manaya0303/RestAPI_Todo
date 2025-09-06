import { Box, extendTheme } from "@chakra-ui/react";
import TaskList from "./components/TaskList"

function App() {
  return (
    <>
      <Box
        maxW="container.md" 
        mx="auto"
        p={6}
      >
        <TaskList />
      </Box>
    </>
  );
};

export default App;