import { useState, useRef } from "react";
import axios from "axios";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, IconButton, Input, SimpleGrid, Tooltip, useDisclosure } from "@chakra-ui/react";
import { CgAddR } from "react-icons/cg";

export default function TaskRegist({ onCreated }) {
    const { isOpen, onOpen, onClose: closeDrawer } = useDisclosure();
    const initialFocusRef = useRef(null);
    const [touched, setTouched] = useState({ title: false});
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        title: "",
        content: "",
        limitDate: "",
        place: "",
        notes: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const isTitleError = !form.title.trim();
    const showTitleError = isTitleError && (touched.title || submitted);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(t => ({ ...t, [name]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if(isTitleError) return;
        setSubmitting(true);
        try {
            const res = await axios.post("http://localhost:8080/todo", form);
            onCreated?.(res.data);
            closeWithReset();
            setForm({ title: "", content: "", limitDate: "", place: "", notes: "" });
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setForm({ title:"", content:"", limitDate:"", place:"", notes:"" });
        setTouched({ title:false });
        setSubmitted(false);
    };

    const closeWithReset = () => {
        resetForm();
        closeDrawer();
    }

    return (
        <>
            <Tooltip label="登録" placement="left">
                <IconButton
                    position="fixed"
                    right={{ base: 4, md: 8 }}
                    bottom={{ base: 4, md: 8 }}
                    zIndex={10}
                    colorScheme="teal"
                    isRound
                    size="lg"
                    aria-label="登録"
                    icon={<CgAddR />}
                    onClick={onOpen}
                />
            </Tooltip>

            <Drawer
                isOpen={isOpen}
                onClose={closeWithReset}
                placement="right"
                initialFocusRef={initialFocusRef}
                size="md"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>タスクを登録</DrawerHeader>

                    <form onSubmit={handleSubmit}>
                        <DrawerBody>
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <FormControl isRequired isInvalid={showTitleError} gridColumn={{ base: "1", md: "span 2"}}>
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                        ref={initialFocusRef}
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="卵を買う"
                                    />
                                    <FormErrorMessage>タイトルは必須です</FormErrorMessage>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Content</FormLabel>
                                    <Input
                                        name="content"
                                        value={form.content}
                                        onChange={handleChange}
                                        placeholder="なるべく安いもの"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Notes</FormLabel>
                                    <Input
                                        name="notes"
                                        value={form.notes}
                                        onChange={handleChange}
                                        placeholder="10個入りは食べきれない!"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Limit</FormLabel>
                                    <Input
                                        type="date"
                                        name="limitDate"
                                        value={form.limitDate}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Place</FormLabel>
                                    <Input
                                        name="place"
                                        value={form.place}
                                        onChange={handleChange}
                                        placeholder="家の前のスーパー"
                                    />
                                </FormControl>
                            </SimpleGrid>
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant="ghost" mr={3} onClick={closeWithReset}>
                                キャンセル
                            </Button>
                            <Button colorScheme="teal" type="submit" isLoading={submitting} isDisabled={isTitleError}>
                                登録
                            </Button>
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </>
    );
}