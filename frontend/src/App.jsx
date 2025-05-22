import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { addEmployee, getEmployee } from '../api_service';

function App() {
  const [employeeList, setEmployeelist] = useState([]);
  const [name, setemployeename] = useState('');
  const [designation, setdesignation] = useState('');


  useEffect(() => {
    getEmployee().then(data => {
      console.log(data);
      setEmployeelist(data);
    })
  }, [])

  const onchaneName = (e) => {
    const { name, value } = e.target;
    setemployeename(value);
  }

  const onchaneDesignation = (e) => {
    const { name, value } = e.target;
    setdesignation(value);
  }

  const saveEmployee = () => {
    addEmployee({ name: name, designation: designation }).then(resp => {
      console.log(resp);
      getEmployee().then(data => {
        console.log(data);
        setemployeename('');
        setdesignation('')
        setEmployeelist(data);
      })

    })
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="javascript:void(0)">Logo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0)">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0)">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0)">Link</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="text" placeholder="Search" />
              <button className="btn btn-primary" type="button">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className='container-fluid p-3'>
        <div className='card'>
          <div className='card-header'>React + FastAPI Project</div>
          <div className='card body m-4 rounded-0'>
            <div className='card border-0 rounded-0'>
              <div className='card-header'>Add employee</div>
              <div className='card-body'>
                <form action="/action_page.php">
                  <div className="form-group">
                    <label htmlFor="email">Name :</label>
                    <input type="text" onChange={onchaneName} value={name} className="form-control" id="name" name='name' />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="pwd">Designation :</label>
                    <input type="text" onChange={onchaneDesignation} value={designation} className="form-control" id="designation" name='designation' />
                  </div>
                  <button type="button" onClick={saveEmployee} className="btn btn-secondary">Submit</button>
                </form>
              </div>
            </div>

          </div>
          <div className='card m-3'>
            <div className='card-header'>Employe List</div>
            <div className='card-body'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    employeeList.map(item => {
                      return <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.designation}</td>
                      </tr>
                    })
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default App
