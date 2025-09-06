import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text, Tooltip, useDisclosure } from "@chakra-ui/react"
import { LuEllipsis } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";


export const TaskDetail = ({ taskId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [taskDetail, setTaskDetail] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOpen = async () => {
        onOpen();
        setLoading(true);
        try{
            const res = await axios.get(`http://localhost:8080/todo/${taskId}`);
            setTaskDetail(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Tooltip label="詳細" placement="top">
            <IconButton 
                onClick={handleOpen} 
                icon={<LuEllipsis />}
                isRound
                aria-label="詳細"
                />
        </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
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