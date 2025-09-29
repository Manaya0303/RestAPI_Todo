import { useState, useRef } from "react";
import { 
    IconButton, Tooltip, useDisclosure, Button, AlertDialog, AlertDialogOverlay, 
    AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

export default function TaskDelete ({ taskId, onDelete }) {

    const { isOpen ,onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async (e) => {
        e.stopPropagation();
        setLoading(true);
        await onDelete(taskId);
        setLoading(false);
        onClose();
    };

    return (
        <>
            <Tooltip label="削除" placement="top">
                <IconButton
                    aria-label="削除"
                    icon={<FiTrash2 />}
                    size="sm"
                    variant="ghost"
                    color="gray.700"
                    onClick={(e) => {e.stopPropagation(); onOpen(); }}
                    transition="all .35s ease-out"
                    _hover={{ bg: "red.500", color: "white"}}
                    _active={{ bg: "red.600", color: "white"}}
                />
            </Tooltip>

            <AlertDialog
                isOpen={isOpen}
                onClose={(e) => { if (e?.stopPropagation) e.stopPropagation(); onClose(); }}
                leastDestructiveRef={cancelRef}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>このタスクを削除しますか？</AlertDialogHeader>
                        <AlertDialogBody>この操作は元に戻せません。</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={(e) => { e.stopPropagation(); onClose(); }}>
                                キャンセル
                            </Button>
                            <Button 
                                colorScheme="red" 
                                ml={3} 
                                isLoading={loading} 
                                onClick={handleConfirm}
                                >
                                削除する
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}


