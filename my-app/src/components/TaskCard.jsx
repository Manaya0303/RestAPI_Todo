import { useState,useRef } from "react";
import { Box, Heading, Text, IconButton, Tooltip,useDisclosure } from "@chakra-ui/react";
import { LuSquareCheckBig } from "react-icons/lu";
import { TiPin } from "react-icons/ti";
import { TaskDetail } from "./TaskDetail";

export default function TaskCard({ task, onFinish }) {

    const [ disableCardTip, setDisableCardTip ] = useState(false);
    const [ flipped, setFlipped ] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const openedOnceRef = useRef(false);
    
    const onCardClick = () => {
        if(!isOpen) setFlipped(true);
    };

    const onFlipEnd = (e) => {
        if (e.propertyName !== "transform") return;
        if (flipped && !isOpen && !openedOnceRef.current ) {
            openedOnceRef.current = true;
            onOpen();
        }
    };

    const handleClose = () => {
        onClose();
        openedOnceRef.current = false;
        setFlipped(false);
    };

    return (
        <>
            <Box
                w="250px"
                h="150px"
                sx={{ perspective: "1000px"}}
                onClick={onCardClick}
                cursor="pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault(); onCardClick();
                    }
                }}
            >
                <Box
                    position="relative"
                    w="100%"
                    h="100%"
                    transition="transform 0.8s"
                    sx={{ transformStyle: "preserve-3d" }}
                    transform={flipped? "rotateY(180deg)" : "rotateY(0deg)"}
                    onTransitionEnd={onFlipEnd}
                >
                    <Tooltip
                        label="カードをクリックして詳細を表示"
                        placement="top"
                        openDelay={300}
                        isDisabled={disableCardTip}
                    >
                        <Box 
                            backgroundColor="teal.50"
                            gap="5"
                            mx="auto"
                            p={4}
                            borderRadius="md"
                            boxShadow="lg"
                            w="250px"
                            h="150px"
                            _hover={{ transform: "scale(1.02) rotate(-1deg)", boxShadow: "2xl", cursor: "pointer" }}
                            transition="all 0.2s"
                            position="absolute"
                            sx={{ backfaceVisibility: "hidden" }}
                        >
                            <Box position="absolute" top="6px" right="6px" color="red.500" >
                                <TiPin size={18} />
                            </Box>

                        <Heading size="md">Title:{task.title}</Heading>
                        <Text textAlign="center">Content:{task.content}</Text>
                        <Text textAlign="center">Limit:{task.limitDate}</Text>

                        <Box>
                            <Box 
                                mt={3} 
                                display="flex" 
                                justifyContent="flex-end" gap={2}  
                                onClick={(e) => e.stopPropagation()}
                                onMouseDown={(e) => e.stopPropagation()}
                            >
                                <Tooltip label="完了" placement="top">
                                    <IconButton 
                                        onClick={() => onFinish(task.taskId) }
                                        icon={ <LuSquareCheckBig /> }
                                        isRound
                                        bgColor="gray.100"
                                        opacity="0.8"
                                        aria-label="完了ボタン"
                                    ></IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                    </Tooltip>
                    <Box
                        position="absolute"
                        inset="0"
                        bg="teal.50"
                        borderRadius="md"
                        boxShadow="lg"
                        p={4}
                        sx={{ backfaceVisibility: "hidden" }}
                        transform="rotateY(180deg)"
                        pointerEvents="none"
                        aria-hidden="true"
                    />
                </Box>
            </Box>

            <TaskDetail isOpen={isOpen} onClose={handleClose} taskId={task.taskId} />
        </>
    )

}