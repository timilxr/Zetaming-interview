import React, {useState, useEffect} from 'react';
// import {Redirect} from 'react-router-dom';
import {Button, Table, Alert} from 'react-bootstrap';
import axios from 'axios';

const ViewStaff = () => {
    const [msg, setMsg] = useState('');
    const [load, setLoad] = useState(false);
    const [records, setRecords] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:2000/staff/')
        .then(res=>{
            const h = res.data;
            setRecords(h);
            console.log(res.data);
        setLoad(true);})
        .catch(err=>console.log(`Error: ${err}`));
    // console.log(props.data);
    // setRecords(props);
    // console.log(props.data);
    }, []);

    const delData = (g) => {
        axios.delete(`http://localhost:2000/staff/${g}`)
        .then((res)=>{
            console.log(res.data);
            setMsg(res.data);
            let h = records.filter((el)=>el._id !== g);
            console.log(h);
            setRecords(h);
            console.log(records);
        })
        .catch((err)=>console.log(`Error: ${err}`));
    }
    // const upData = (g) => {
    //     return(<Redirect to={"http://localhost:3000/admin/staff/"+g} />);
    // }

    if (load){
        return(
            <div>
                {msg ? <Alert variant="success">{msg}</Alert> : ''}
                <Table striped bordered hover variant="dark" className="mt-4">
                    <thead>
                        <tr>
                        <th>Staff Number</th>
                        <th>FirstName</th>
                        <th>Lastname</th>
                        <th>Levels</th>
                        <th>Class Held</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length === 0? 
                        <tr>
                            <td colSpan='7' ><h3>No Records Available</h3></td>
                        </tr>
                        :
                        records.map((value, index)=>{
                            // console.log(value);
                            return (<tr key={value._id} className="text-center">
                                        <td>{value.staff_no}</td>
                                        <td>{value.firstname}</td>
                                        <td>{value.lastname}</td>
                                        <td>Level {value.level}</td>
                                        <td>{value.class_held}</td>
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
        return <h1>Loading Staff Data</h1>
    }
};

export default ViewStaff;