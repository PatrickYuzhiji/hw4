import { Button, Container, Form, Row } from "react-bootstrap";

const Classroom = () => {
    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName"/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor"/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest"/>
            <br />
            <Button variant="neutral">Reset Search</Button>
        </Form>
        <Container fluid>
            <Row>
                { /* TODO Students go here! */ }
            </Row>
        </Container>
    </div>

}

export default Classroom;