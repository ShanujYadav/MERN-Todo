import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'

const MyNavbar = () => {
const [searchItem,setSearchItem]=useState();

const onSearchHandler=(e)=>{
setSearchItem('')
}
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Todo List</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>

            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Addnew">Add Task</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setSearchItem(e.target.value)}
              value={searchItem}
            />
            <Link to={`/getuser/${searchItem}`}><Button className="outline-primary"  onClick={onSearchHandler} >Search</Button></Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;