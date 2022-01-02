import { TaskType } from "../interfaces/TaskType";
import { Button } from 'react-bootstrap';
import { useRouter } from "next/router";
import TaskList from "src/components/tasks/TaskList";
import { Layout } from 'src/components/Layout';

interface Props {
  tasks: TaskType[]
}

export default function IndexPage(props: Props) {
  console.log(props.tasks); //array de objetos x cada tarea

  const { push } = useRouter();

  return (
    <Layout>
      {
        props.tasks.length === 0 
        ? (
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-auto align-items-center">
                <h2>Aún no hay tareas</h2>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-sm-auto align-items-center">
                <Button onClick={() => push("/tasks/new")}>Ir a crear tareas</Button>
              </div>
            </div>
          </div>
          )
        : (
          <TaskList tasks={props.tasks}/>
          )
      }
    </Layout>
  )
}


export const getServerSideProps = async() => {

  const res = await fetch('http://localhost:3000/api/tasks');
  console.log('46 index',res);
  const resJson = await res.json();
  console.log('48 index',resJson);// me retorna el array de objetos x cada tarea
    // todo eso sin necesidad de usar get
    
  return {
    props: {
      tasks : resJson
    }
  }
}



