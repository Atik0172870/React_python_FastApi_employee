import { useEffect, useState } from 'react'
import { addEmployee, deleteEmployee, getEmployee, updateEmployee } from '../api_service';

function App() {

  useEffect(() => {
    getAllEmployee();
  }, [])

  const [employeeList, setEmployeelist] = useState([]);
  const [name, setemployeename] = useState('');
  const [designation, setdesignation] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [isEdit, setEdit] = useState(false);
  const [searchEmployee, setSearchsetEmployeelist] = useState({});



  const onSelect = (item) => {
    let isUpdate = true;
    if (selectedEmployee.id == item.id) {
      item = {};
      isUpdate = false;

    }
    setEdit(isUpdate);
    setemployeename(item.name || '');
    setdesignation(item.designation || '')
    setSelectedEmployee(item);
  }
  const getAllEmployee = () => {
    getEmployee().then(data => {
      console.log(data);
      setEmployeelist(data);
      setSearchsetEmployeelist(data);
    })
  }
  const onchaneName = (e) => {
    const { name, value } = e.target;
    setemployeename(value);
  }

  const onchaneDesignation = (e) => {
    const { name, value } = e.target;
    setdesignation(value);
  }

  const saveEmployee = () => {
    if (isEdit) {
      updateEmployee({ id: selectedEmployee.id, name: name, designation: designation }).then(resp => {
        console.log(resp);
        getAllEmployee();
      })
    }
    else {
      addEmployee({ name: name, designation: designation }).then(resp => {
        console.log(resp);
        getAllEmployee();
      })
    }
    setemployeename('');
    setdesignation('')
  }

  const deleteIEmployeeById = (id) => {
    deleteEmployee(id).then(resp => {
      console.log(resp);
      getAllEmployee();
    })
  }

  const onSearch = (event) => {
    const { name, value } = event.target;
    const serchemployee = searchEmployee.filter(x => x.name.toLowerCase().includes(value.toLowerCase()) || x.designation.toLowerCase().includes(value.toLowerCase()));
    setEmployeelist(serchemployee);
    

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
                    <input type="text" onChange={onchaneName} value={name || ''} className="form-control" id="name" name='name' />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="pwd">Designation :</label>
                    <input type="text" onChange={onchaneDesignation} value={designation || ''} className="form-control" id="designation" name='designation' />
                  </div>
                  <button type="button" onClick={saveEmployee} className="btn btn-secondary">{isEdit ? 'Update' : 'Save'}</button>
                </form>
              </div>
            </div>

          </div>
          <div className='card m-3'>
            <div className='card-header d-flex align-items-center justify-content-between'>
              <span>Employe List</span>
              <span className='d-flex align-content-center gap-4'>
                <input className="form-control form-control-sm me-2 w-auto" type="text" placeholder="Search" onChange={onSearch} />
                <span className='btn btn-sm' title='refresh' onClick={() => { getAllEmployee() }}>&#128260;</span>
              </span>

            </div>
            <div className='card-body table-responsive'>
              <table className='table table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    employeeList.map(item => {
                      return <tr key={item.id} onClick={() => onSelect(item)} className={`${selectedEmployee.id == item.id ? "table-secondary" : ""}`}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.designation}</td>
                        <td><span className='btn btn-sm btn-outline-danger' onClick={() => deleteIEmployeeById(item.id)}>Delete</span></td>
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
