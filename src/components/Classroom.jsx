import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import Student from "./Student";

const Classroom = () => {
    // TODO: Fetch students from the API

    // With all of the data being displayed, we need to provide the user with a way to narrow down their results. 
    // Implement search functionality so that a user may search by name, major, 
    // and interests with results appearing as they type -- 
    // there is no search button. Only students that match the typed search criteria should be displayed.
    // create a variable containing a list of searched students derived from the complete list of students
    const [students, setStudents] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputMajor, setInputMajor] = useState('');
    const [inputInterest, setInputInterest] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch("https://cs571.org/rest/f24/hw4/students", {
            method: "GET",
            headers: {"X-CS571-ID": "bid_98c5657e8b78dd46d95d3bfc60ab9ce817f77ae20fbae7eefdf042a344e41552"}
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            setStudents(data);
        })
        .catch((error) => { console.error('Error:', error); });
    }, []);

    const filteredStudents = students.filter(student => {
        const fullName = student.name.first.toLowerCase() + " " + student.name.last.toLowerCase();
        const nameMatch = !inputName || fullName.includes(inputName.trim().toLowerCase());
        const majorMatch = !inputMajor || student.major.toLowerCase().includes(inputMajor.trim().toLowerCase());
        const interestMatch = !inputInterest || student.interests.some(interest => interest.toLowerCase().includes(inputInterest.trim().toLowerCase()));
        return nameMatch && majorMatch && interestMatch;
    });

    const handleReset = () => {
        setInputName('');
        setInputMajor('');
        setInputInterest('');
        setPage(1);
    };

    useEffect(() => {
        setPage(1);
    }, [inputName, inputMajor, inputInterest]);
    // Add "Previous" and "Next" buttons.
    const pages = Math.ceil(filteredStudents.length / 24);
    let items = [];
    for (let number = 1; number <= pages; number++) {
        items.push(
            <Pagination.Item onClick={() => setPage(number)} key={number} active={number === page}>
                {number}
            </Pagination.Item>
        )};

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)} />

            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor"
                value={inputMajor}
                onChange={(e) => setInputMajor(e.target.value)} />

            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest"
                value={inputInterest}
                onChange={(e) => setInputInterest(e.target.value)} />
            <br />
            <Button variant="neutral" onClick={handleReset}>Reset Search</Button>
        </Form>
        <Container fluid>
            <Row>
                <p>There are {filteredStudents.length} student(s) matching your search.</p>
                {filteredStudents.slice((page - 1) * 24, page * 24).map((student) => (
                    <Col sm={12} xs={12} md={6} lg={4} xl={3} key={student.id}>
                        <Student {...student} />
                    </Col>
                ))}
            </Row>
            <Pagination>
            <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1 || pages === 0}>Previous</Pagination.Prev>
            {items}
            <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === pages || pages === 0}>Next</Pagination.Next>
                </Pagination>
        </Container>
    </div>
}

export default Classroom;