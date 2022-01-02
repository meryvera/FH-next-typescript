import React from 'react';
import { Navbar, Container, Form, Button } from 'react-bootstrap';
import { NavbarComponent } from './Navbar';

export const Layout = ({children} : {children: JSX.Element | JSX.Element[]}) => {
  return (
    <div>
      <NavbarComponent />
      <Container className='pt-5 vh-90'>
        <main className='bg-info'>
          {children}
        </main>
      </Container>
    </div>
  )
}
