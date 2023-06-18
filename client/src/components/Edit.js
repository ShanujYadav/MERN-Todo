import React, { useEffect, useState } from 'react'
import { Container, Button, Form } from 'react-bootstrap';
import { useParams ,useNavigate} from 'react-router-dom';

const Edit = () => {
    const Navigate=useNavigate();
    const { id } = useParams("")
    const [inpval, setInp] = useState({
        title: "",
        description: ""
    })

    const setdata = (e) => {
        const { name, value } = e.target;
        setInp((preval) => {
            return {
                ...preval, [name]: value
            }
        })
    }

    const getuser = async (e) => {
        const res = await fetch(`http://localhost:8000/edituser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();
        if (res.status === 422 || !data) {
            alert('Not Exist')
        }
        else {
            setInp(data)
        }
    }

    useEffect(() => {
        getuser();
    }, [])
    
    const onUpdateHandler = async(e) => {
        e.preventDefault()
        const {title,description}=inpval;
        const res2 = await fetch(`http://localhost:8000/updateuser/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                    title,description
            })
        })
        const data2=await res2.json()
        
        if (res2.status === 422 || !data2) {
            alert('Fill All Fields')
        }
        else {
            alert("Data Updated")
            Navigate("/")
        }
    }

    return (
        <Container className='mt-5' style={{ width: 700 }}>
             <div style={{ justifyContent: 'center', textAlign: 'center' }} className='mt-5 mb-5'>
                <h2>Update</h2>
            </div>
            <Form >
                <Form.Group className="mb-5" >
                    <Form.Control
                        type="text"
                        name='title'
                        placeholder="Title"
                        value={inpval.title}
                        onChange={setdata}/>
                </Form.Group>

                <Form.Group className="mb-5" >
                    <textarea
                    type='text'
                    name='description'
                        className="form-control"
                        rows="5"
                        placeholder='Description'
                        value={inpval.description}
                        onChange={setdata}
                    >

                    </textarea>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" onClick={onUpdateHandler} type="submit" className="mb-5 form-control">
                        Update
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default Edit;