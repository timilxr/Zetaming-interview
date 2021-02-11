import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Table, Alert} from 'react-bootstrap';
import axios from 'axios';

const TeacherStudents = (props) => {
    const [msg, setMsg] = useState('');
    const [load, setLoad] = useState(false);
    const {class_held} = useParams();
    const [staff, setStaff] = useState([]);
    const [records, setRecords] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:2000/staff/${class_held}`)
        .then(res=>{
            const newStaff = res.data[0];
            setStaff(newStaff);
            // console.log(newStaff);
            // console.log(staff);
            setLoad(true);
            axios.get(`http://localhost:2000/students/${staff.class_held}`)
            .then(res=>{
                const students = res.data;
                setRecords(students);
            })
            .catch(err=>console.log(`Error: ${err}`));
            })       
        .catch(err=>console.log(`Error: ${err}`));
    }, [class_held, staff]);

    function delData(g) {
        axios.delete(`http://localhost:2000/students/${g}`)
            .then((res) => {
                console.log(res.data);
                setMsg(res.data);
                let h = records.filter((el) => el._id !== g);
                // console.log(h);
                setRecords(h);
                console.log(records);
            })
            .catch((err) => console.log(`Error: ${err}`));
    }
    // const upData = (g) => {
    //     return(<Redirect to={"http://localhost:3000/admin/staff/"+g} />);
    // }

    if (load){
        console.log(staff);
        return(
            <div>
                <div className="row">
                    <div className="col-3">
                        <h2>Staff No.</h2>
                        <h2>Staff FullName:</h2>
                    </div>
                    <div className="col-9 text-left text-capitalize">
                        <h2>{staff.staff_no}</h2>
                        <h2>{staff.firstname + ' ' + staff.lastname}</h2>
                    </div>
                </div>
                {msg ? <Alert variant="success">{msg}</Alert> : ''}
                <Table striped bordered hover variant="dark" className="mt-4">
                    <thead>
                        <tr>
                        <th>Student Number</th>
                        <th>FirstName</th>
                        <th>Lastname</th>
                        <th>Class</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length === 0 ? 
                        <tr>
                            <td colSpan='7' ><h3>No Records Available</h3></td>
                        </tr>
                        :
                        records.map((value, index)=>{
                            // console.log(value);
                            return (<tr key={value._id} className="text-center">
                                        <td>{value.student_no}</td>
                                        <td>{value.firstname}</td>
                                        <td>{value.lastname}</td>
                                        <td>{value.clas}</td>
                                        {/* <td>
                                        <Button variant="info" type="button" onClick={()=>upData(value._id)}>Edit</Button>{' '}
                                        </td> */}
                                        <td>
                                            <Button variant="danger" type="button" onClick={()=>delData(value._id)}>Delete</Button>{' '}
                                        </td>
                                    </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
    )
    } else {
        return <h1>Loading Students Data</h1>
    }
};

export default TeacherStudents;