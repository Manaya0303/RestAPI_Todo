import { useEffect, useState } from "react";
import axios from "axios";
import { IconButton, VStack, Text, Heading, Box, SimpleGrid, Tooltip } from "@chakra-ui/react";
import { LuSquareCheckBig } from "react-icons/lu";
import { TiPin } from "react-icons/ti";
import { TaskDetail } from "./TaskDetail";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get("http://localhost:8080/todo");
                setTasks(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTasks();
    },[]);

    const finishTask = async (taskId) => {
        try {
            await axios.put(`http://localhost:8080/todo/${taskId}/finish`)
            setTasks(tasks.filter((task) => task.taskId !== taskId));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <VStack
        borderColor="cyan.50"
        borderWidth="1px"
        borderRadius="5px"
        p={6}
        align="stretch"
        bg="white"
        w="full"
        spacing={6}
        >
            <SimpleGrid columns={[1, 2, 3]} spacing={6} minChildWidth="220px">
                {tasks
                    .filter(task => !task.finishStatus)
                    .map(task => (
                        <Box 
                            key={task.taskId}
                            backgroundColor="teal.50"
                            gap="5"
                            mx="auto"
                            p={4}
                            borderRadius="md"
                            boxShadow="lg"
                            w="250px"
                            h="150px"
                            _hover={{ transform: "scale(1.02) rotate(-1deg)", boxShadow: "2xl"}}
                            transition="all 0.2s"
                            position="relative"
                        >
                            <Box position="absolute" top="6px" right="6px" color="red.500" >
                                <TiPin size={18} />
                            </Box>
                            <Heading size="md">Title:{task.title}</Heading>
                            <Text textAlign="center">Content:{task.content}</Text>
                            <Text textAlign="center">Limit:{task.limitDate}</Text>
                            <Box>
                            <Tooltip label="完了" placement="top">
                                <IconButton 
                                    onClick={() => finishTask(task.taskId)}
                                    icon={ <LuSquareCheckBig /> }
                                    isRound
                                    bgColor="gray.100"
                                    opacity="0.8"
                                    aria-label="完了ボタン"
                                ></IconButton>
                            </Tooltip>
                            <TaskDetail taskId={task.taskId} />
                            </Box>
                        </Box>
                ))}
            </SimpleGrid>
        </VStack>
    )
}

export default TaskList;