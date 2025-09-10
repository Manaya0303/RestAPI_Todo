import { useEffect, useState } from "react";
import axios from "axios";
import { VStack, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import TaskCard from "./TaskCard";

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
                        <TaskCard
                            key={task.taskId}
                            task={task}
                            onFinish={finishTask}
                        />
                ))}
            </SimpleGrid>
            
        </VStack>
    )
}

export default TaskList;