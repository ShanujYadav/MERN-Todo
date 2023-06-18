import React, { useEffect, useState } from 'react'
import { Container,Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Home = () => {
    const [getuserdata, setuserdata] = useState([])
    const getdata = async (e) => {
        const res = await fetch("http://localhost:8000/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await res.json();
        if (res.status === 422 || !data) {
            console.log('error')
        }
        else {
            setuserdata(data)
        }
    }

    // Detete  
    const onDlt = async(id) => {
      const res2=await fetch(`http://localhost:8000/deleteuser/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
      });

      const deletedata=await res2.json()
      if (res2.status === 422 || !deletedata) {
        console.log('error')
    }
    else {
       alert('You Want to Delete..')
       getdata();
    }
    }

    useEffect(() => {
        getdata()
    }, [])

    return (

        <Container className='mt-5' style={{ width: 1100 }}>
            <div style={{justifyContent: 'center', textAlign: 'center' }} className='mb-3'>
                <h1>All Tasks</h1>
            </div>
            <div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getuserdata.map((Element,id) => {
                                return (
                                    <>
                                        <tr key={id}>
                                            <th scope="row">{id+1}</th>
                                            <td >{Element.title}</td>
                                            <td >{Element.description}</td>
                                            <td><Link to={`/Edit/${Element._id}`}><Button className="outline-info">Edit</Button></Link></td>
                                            <td><Button variant='danger' onClick={()=>onDlt(Element._id)}>Delete</Button></td>
                                        </tr>
                                    </>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </Container>
    )
}

export default Home