import { useEffect, useState } from "react";
import axios from "axios";

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

    return (
        <ul>
            {tasks
                .filter(task => !task.finishStatus)
                .map(task => (
                    <li key={task.taskId}>
                        <h3>タイトル：{task.title}</h3>
                        <p>内容：{task.content}</p>
                        <p>メモ：{task.notes}</p>
                        <p>期限：{task.limitDate}</p>
                        <p>場所：{task.place}</p>
                        <p>作成日：{task.registeredDate}</p>
                    </li>
                ))
            }
        </ul>
    )
}

export default TaskList;