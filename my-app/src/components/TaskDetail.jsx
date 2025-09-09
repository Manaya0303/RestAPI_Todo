import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Text, } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import axios from "axios";


export const TaskDetail = ({ isOpen, onClose, taskId }) => {
    const [taskDetail, setTaskDetail] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen || !taskId) return;
        setLoading(true);
        setTaskDetail(null);
        axios.get(`http://localhost:8080/todo/${taskId}`)
            .then(res => setTaskDetail(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [isOpen, taskId]);

    return (
        <>
            <Modal 
                isOpen={isOpen} 
                onClose={onClose} 
                isCentered 
                size="lg"
                motionPreset="slideInBottom"
            >
                <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
                <ModalContent
                    borderRadius="2xl"
                    boxShadow="2xl"
                    overflow="hidden"
                    maxW={{ base: "90vw", md: "720px"}}
                >
                    <ModalHeader>{taskDetail?.title ?? "タスク詳細"}</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={2} >
                        {loading && <Spinner />}
                        {taskDetail && (
                            <>
                                <Text mb={2}><b>Title:</b> {taskDetail.title}</Text>
                                <Text mb={2}><b>Content:</b> {taskDetail.content}</Text>
                                <Text mb={2}><b>Notes:</b> {taskDetail.notes}</Text>
                                <Text mb={2}><b>Limit:</b> {taskDetail.limitDate}</Text>
                                <Text mb={2}><b>Place:</b> {taskDetail.place}</Text>
                                <Text mb={2}><b>CreatedDate:</b> {new Date(taskDetail.registeredDate).toLocaleDateString()}</Text>
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );

};