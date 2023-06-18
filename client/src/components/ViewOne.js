import React, { useEffect, useState } from 'react'
import { Container, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

const ViewOne = () => {

    const { searchItem } = useParams("")
    const [getuserdata, setuserdata] = useState([])

    const getuser = async(e) => {
        const res = await fetch(`http://localhost:8000/getuser/${searchItem}`,{
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
            setuserdata(data)
        }
    }

    useEffect(() => {
        getuser();
    }, [])

    return (
        <Container className='mt-5' style={{ width: 700 }}>
            <Form >
                <Form.Group className="mb-5" >
                    <Form.Control
                        type="text"
                        placeholder="Title"
                        value={getuserdata.title}
                    />
                </Form.Group>

                <Form.Group className="mb-5" >
                    <textarea
                        className="form-control"
                        rows="5" 
                        placeholder='Description'
                        value={getuserdata.description}
                        >

                    </textarea>
                </Form.Group>
                <div className="text-center">
                    <Link to='/'><Button className="mb-5 form-control">Return</Button></Link>
                </div>
            </Form>
        </Container>
    )
}

export default ViewOne