import React, {useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteButton from "./components/DeleteButton";
import AddButton from "./components/AddButton";

export interface IStudent {
    id?: number
    fio: string
    birthDate: Date
    inn: number
    email: string
}

function App() {
    const [all, setAll] = useState<IStudent[]>([]);

    const fetchAll = async () => {
            const url = process.env.REACT_APP_API + "/student-resource/get-all"
            try {
                const response = await fetch(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                const json = await response.json();
                setAll(json)
                console.log(json);
            } catch
                (error) {
                console.log("error", error);
            }
        }
    ;

    useEffect(() => {
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
                        <td>{new Date(student.birthDate).toLocaleDateString()}</td>
                        <td>{student.inn}</td>
                        <td>{student.email}</td>
                        <td><DeleteButton student={student} deleteHandler={
                            () => fetchAll()
                        }/></td>
                    </tr>
                )}
                </tbody>
            </Table>
            <AddButton addHandler={() => fetchAll()}/>
        </Container>
    );
}

export default App;
