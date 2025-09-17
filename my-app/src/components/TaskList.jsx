import { useEffect, useState } from "react";
import axios from "axios";
import { VStack, SimpleGrid, } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import TaskRegist from "./TaskRegist";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    
    const handleRegisted = (newTask) => {
        setTasks((prev) => [newTask, ...prev]);
    }; 


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
            await axios.put(`http://localhost:8080/todo/${taskId}/finish`);
            setTasks(tasks.filter( t => t.taskId !== taskId));
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
            <TaskRegist onCreated={handleRegisted} />
            
        </VStack>
    )
}

export default TaskList;