import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, MouseEvent, useState, useEffect } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import { Layout } from 'src/components/Layout';
import { TaskType } from '../../interfaces/TaskType'

export default function NewPage() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter();

  const inititalState = {
    title: "",
    description: "",
  };

  const [state, setstate] = useState(inititalState)
  
  /* Evento Handle Input */
  const handleChange = (e : ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => { //este evento es de tipo ChangeEvent y puede ser del elemento input o textarea de HTML
    //console.log(e.target.name, e.target.value);
    setstate({...state, [e.target.name]: e.target.value});
  }

  /* Create */
  const createTask = async( task: TaskType ) => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /* Edit */
  const updateTask = async (id: string, task: TaskType) => {
    await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /* Edit - Cargar datos existentes, en componente new */
  const loadTaskForEdit = async(id: string) => {
    const res = await fetch("http://localhost:3000/api/tasks/" + id);
    const task = await res.json();
    console.log(task);
    setstate({ title: task.title, description: task.description });
  }

  /* Evento Submit */
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      console.log('createTask 59', router); // {pathname:"tasks/new", route:"tasks/new", query:{}, push: function(), ...} si es nuevo query es vacio, si ya existe la tarea alli va el id
        // si es para editar viene asi: {pathname:"tasks/edit/[id]", route:"tasks/new[id]", query:{id:"15"}, push: function(), ...}
      if (typeof router.query.id === "string") {
        updateTask(router.query.id, state);
      } else {
        createTask(state);
      };   
      setstate(inititalState);
      router.push("/");  
    } catch (error) {
      console.log(error);
    }
    
  }

  /* Delete */
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks/" + id, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };


  /* Edit - Cargar datos existentes, en componente new , con la ruta seteada previamente en TaskList.tsx */
  useEffect(() => {
    console.log(router.query)//{id:1}
    if(typeof router.query.id === 'string') loadTaskForEdit(router.query.id);
  }, [router.query])

  return (
    <Layout>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Form  >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titulo</Form.Label>
              <Form.Control type="text" placeholder="write your titulo" name="title" onChange={handleChange} value={state.title}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" placeholder="write your description" name="description" onChange={handleChange} value={state.description} rows={3} />
            </Form.Group> 
            {
              router.query.id
              ? (<Button variant="info" onClick={handleSubmit} >Upddate&nbsp; <i className="far fa-save"></i></Button>)
              : (<Button variant="info" onClick={handleSubmit} >Save&nbsp; <i className="far fa-save"></i></Button>)
            }
          </Form>
        </Card.Body>
        <button className="btn btn-danger w-50" onClick={handleShow}>Delete</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>You sure you want to delete thhis card?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => typeof router.query.id === "string" && handleDelete(router.query.id)}>
              Borrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </Layout>
  )
}
