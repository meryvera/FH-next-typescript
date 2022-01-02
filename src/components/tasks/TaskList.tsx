import React from 'react';
import { TaskType } from "../../interfaces/TaskType";
import { Card, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

interface Props {
  tasks: TaskType[]
}

export default function TaskList( props : Props ) {
  
  console.log('que esestoooo',props) // Object - tasks:Array / 0 = {id: 11, title: "222", description: "222", created_on: "2021-12-29T03:43:23.256Z"}
  
  const router = useRouter();

  return (
    <>
      {
        props.tasks.map(tarea => (
          <Card key={tarea.id} style={{ width: '18rem' }} className='mb-3 mx-auto' onClick={() => router.push(`/tasks/edit/${tarea.id}`)}>
            <Card.Body>
              <Card.Title>{tarea.title}</Card.Title>
              {
                tarea.created_on 
                && (<Card.Subtitle>{new Date(tarea.created_on).toLocaleDateString()}</Card.Subtitle>)
              }
              <Card.Text>{tarea.description}</Card.Text>
            </Card.Body>
          </Card>
        ))
      }
    </>

    )
}
