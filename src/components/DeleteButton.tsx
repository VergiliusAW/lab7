import React, {FC} from 'react'
import {IStudent} from "../App";
import {Button, Container} from "react-bootstrap";

interface DeleteProps {
    student: IStudent
    deleteHandler: () => void
}

const DeleteButton: FC<DeleteProps> = ({student, deleteHandler}) => {
    const deleteStudent = async () => {
        const url = process.env.REACT_APP_API + "/student-resource/delete"
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student)
            })
            const json = response.json()
            console.log(json)
            deleteHandler()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            <Button variant={"danger"} onClick={() => deleteStudent()}>
                Удалить
            </Button>
        </Container>
    )
}

export default DeleteButton