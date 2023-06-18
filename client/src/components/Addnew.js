import React, { useState } from 'react'
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Addnew = () => {
    const navigate=useNavigate()
    const[inpval,setInp]=useState({
        title:"",
        description:""
    })

    const setdata=(e)=>{
        const{name,value}=e.target;
        setInp((preval)=>{
            return{
                ...preval,[name]:value
            }
        })
    }


    const onSave= async(e) => {
        e.preventDefault();

        const {title,description} =inpval;
        const res = await fetch("http://localhost:8000/register", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title,description
            })
        })
const data=await res.json();
if (res.status === 422 || !data) {
    console.log('error')
}
else {
    alert('Data Added')
    navigate("/")

}
    }
    return (
        <Container className='mt-5' style={{ width: 700 }}>
            <div style={{ justifyContent: 'center', textAlign: 'center' }} className='mt-5 mb-5'>
                <h1>Add Your Tasks</h1>
            </div>
            <Form >
                <Form.Group className="mb-5" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={setdata}
                        value={inpval.title}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-5" >
                    <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Description"
                        onChange={setdata}
                        name="description"
                        value={inpval.description}
                        required >
                    </textarea>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" type="submit" className="mb-5 form-control" onClick={onSave}>
                        Save
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default Addnew