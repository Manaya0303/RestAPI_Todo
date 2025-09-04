import { useEffect, useState } from "react";
import axios from "axios";
import { HStack, IconButton, StackDivider, VStack, Text, Heading } from "@chakra-ui/react";
import { SiCheckmarx } from "react-icons/si";

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
        divider={<StackDivider />}
        borderColor="cyan.50"
        borderWidth="1px"
        borderRadius="5px"
        p={6}
        alignItems="start"
        backgroundColor="teal.50"
        >
            {tasks
                .filter(task => !task.finishStatus)
                .map(task => (
                    <VStack 
                    key={task.taskId}
                    spacing="5"
                    w="full"
                    mx="auto"
                    >
                        <Heading size="md">title:{task.title}</Heading>
                        <Text textAlign="center">content:{task.content}</Text>
                        <Text textAlign="center">limit:{task.limitDate}</Text>
                        <IconButton 
                            onClick={() => finishTask(task.taskId)}
                            icon={<SiCheckmarx />}
                            isRound
                            bgColor="gray.500"
                            opacity="0.8"
                        ></IconButton>
                    </VStack>
            ))}
        </VStack>
    )
}

export default TaskList;