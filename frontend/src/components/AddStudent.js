import React, {useState} from 'react';
import {Form, Alert, Button} from 'react-bootstrap';
import axios from 'axios';

const AddStudent = () => {
    const initialStudent = {
        student_no: '',
        firstname: '',
        lastname: '',
        clas: ''
    };
    const [msg, setMsg] = useState('');
    const [student, setStudent] = useState(initialStudent);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        // if (e.target.name === 'level' && (e.target.value < 6 || e.target.value > 12)){
        //     return setMsg('Enter valid level');
        // }
        setStudent((prev)=>{
            return{
                ...prev,
                [name] : value
            };
        });
    }

    const handler = (e) => {
        axios.post('http://localhost:2000/students/add', student)
        .then((res)=>{
            console.log(res.data);
            setMsg(res.data);
            setStudent(initialStudent);
        })
        .catch((err)=>console.log(`Error: ${err}`));
        e.preventDefault();
    };



    return(
        <Form className='text-left my-5 py-5 mx-auto rounded bg-white shadow px-md-5' style={{width: 70+'%'}}>
            <h1>Add Student</h1>
            {msg ? <Alert variant="success">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>}
            <Form.Group controlId="formBasicFirstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control name="firstname" onChange={onInputChange} type="text" placeholder="Enter staff firstname" required/>
                <Form.Text className="text-muted">
                We'll never share your name with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicLastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control name="lastname" onChange={onInputChange} type="text" placeholder="Enter staff lastname" required/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicStudentNo">
                <Form.Label>Student No.</Form.Label>
                <Form.Control name="student_no" onChange={onInputChange} type="text" placeholder="Enter student number" required/>
                <Form.Text className="text-muted">
                Enter Student number
                </Form.Text>
            </Form.Group>

            {/* <Form.Group controlId="formBasicStaffLevel">
                <Form.Label>Level</Form.Label>
                <Form.Control name="level" onChange={onInputChange} type="number" max="12" min="6" placeholder="Enter level number" Required/>
                <Form.Text className="text-muted">
                Enter Staff level number
                </Form.Text>
            </Form.Group> */}

            <Form.Group controlId="formBasicClas">
                <Form.Label>Clas</Form.Label>
                <Form.Control name="clas" onChange={onInputChange} as="select" custom>
                <option value="">Select Class</option>
                <option value="JSS 1">JSS 1</option>
                <option vlaue="JSS 2">JSS 2</option>
                <option value="JSS 3">JSS 3</option>
                <option value="SSS 1">SSS 1</option>
                <option vlaue="SSS 2">SSS 2</option>
                <option value="SSS 3">SSS 3</option>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handler}>
                Submit
            </Button>
        </Form>
    )
}

export default AddStudent;