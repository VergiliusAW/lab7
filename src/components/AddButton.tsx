import React, {FC, useState} from "react";
import {Button, Container, FloatingLabel, Form, FormLabel, Modal} from "react-bootstrap";
import {IStudent} from "../App";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface AddProps {
    addHandler: () => void
}

const AddButton: FC<AddProps> = ({addHandler}) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [fio, setFio] = useState("");
    const [inn, setInn] = useState(0);
    const [email, setEmail] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addNewUser = async (student: IStudent) => {
        const url = process.env.REACT_APP_API + "/student-resource/post"
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student)
            })
            const json = await response.json()
            console.log(json)
            setShow(false)
            addHandler()
        } catch (error) {
            console.log(error)
        }
    }

    const handleAdd = () => {
        let student: IStudent = {
            fio: fio,
            birthDate: date,
            inn: inn,
            email: email
        }
        console.log(student)
        addNewUser(student)
    }

    const handlePick = (date: Date) => {
        setDate(date)
    }

    const handleFio = (v: string) => {
        setFio(v)
    }

    const handleInn = (i: number) => {
        setInn(i)
    }

    const handleEmail = (e: string) => {
        setEmail(e)
    }

    return (
        <Container>
            <Button variant="primary" onClick={handleShow}>
                Добавить
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Добавление нового студента</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingInput" label="Фамилия Имя Отчество" className="mb-3">
                        <Form.Control placeholder="Фамилия Имя Отчество" onChange={(e) => handleFio(e.target.value)}/>
                    </FloatingLabel>
                    <FormLabel>Дата рождения</FormLabel>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={date}
                        onChange={handlePick}
                        className="mb-3"
                    />
                    <FloatingLabel controlId="floatingInput" label="ИНН" className="mb-3">
                        <Form.Control placeholder="ИНН" onChange={(e) => handleInn(Number(e.target.value))}/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com"
                                      onChange={(e) => handleEmail(e.target.value)}/>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default AddButton