import React from 'react';
import { Navbar, Container, Form, Button } from 'react-bootstrap';
import Image from "next/image";
import { useRouter } from 'next/router';


export const NavbarComponent = () => {
  
  const router = useRouter();
  
  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="#home" onClick={()=> router.push('/')}>
            <Image
              src="https://image.freepik.com/vector-gratis/plantilla-logotipo-marca-firefly_23-2149201309.jpg"
              width="50px"
              height="60px"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        <Button onClick={() => router.push('/tasks/new') }>New Task</Button>
        </Container>
      </Navbar>
    </>
  )
}
