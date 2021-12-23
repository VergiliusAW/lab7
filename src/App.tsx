import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

interface IStudent {
    id: number
    fio: string
    birthDate: Date
    inn: number
    email: string
}

function App() {
    const [all, setAll] = useState<IStudent[]>([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
            const url = process.env.REACT_APP_API + "/student-resource/get-all"
            const fetchAll = async () => {
                    try {
                        const response = await fetch(url);
                        const json = await response.json();
                        setAll(json)
                        console.log(json);
                    } catch
                        (error) {
                        console.log("error", error);
                    }
                }
            ;

            fetchAll();
        }, []
    );

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Fio</th>
                    <th>birthDate</th>
                    <th>inn</th>
                    <th>email</th>
                    <th>#</th>
                </tr>
                </thead>
                <tbody>
                {all.map((student) =>
                    <tr onDoubleClick={() => console.log("clicked")} key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.fio}</td>
                        <td>{student.birthDate}</td>
                        <td>{student.inn}</td>
                        <td>{student.email}</td>
                        <td><Button variant="danger">Удалить</Button></td>
                    </tr>
                )}
                </tbody>
            </Table>
            <Button>Добавить</Button>
        </Container>
    );
}

export default App;
