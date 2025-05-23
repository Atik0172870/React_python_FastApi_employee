import uvicorn
from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel,Field
from typing import List
from uuid import uuid4, UUID



class employee(BaseModel):
    id:UUID = Field(default_factory=uuid4)  # Auto-generate UUID
    name:str
    designation:str

employeeList = [
    employee(name="Alice", designation="Developer"),
    employee(name="Bob", designation="Designation"),
    employee(name="MD AHTEAR RAHMAN", designation="SR. SOFTWARTE ENGINEER"),
]

app =FastAPI()

origins=[
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def get_employees():
    return  {"Hello , world"}

@app.get("/employees",response_model=list[employee])
def get_employees():
    return  employeeList

@app.post("/employee", response_model=employee)
def add_employee(employee:employee):
    employeeList.append(employee)
    return employee

@app.put("/edit_employee", response_model=employee)
def update_employee(employee:employee):
    find =find_empoyee_by_id(employee.id)
    if find:
        print(employee)
        for index,emp in enumerate(employeeList):
            if emp.id==employee.id:
                employeeList[index]=employee
                return employee
    else:
       raise HTTPException(status_code=404, detail="Employee not found") 
   
   
@app.delete("/delete/{id}",response_model=employee)
def delete_employee(id:UUID):
    findEmp= find_empoyee_by_id(id)
    if findEmp:
        employeeList.remove(findEmp)
        return findEmp
    else:
        raise HTTPException(status_code=404, detail="Employee not found") 

def find_empoyee_by_id(id:UUID):
        employee= next((emp for emp in employeeList if emp.id == id), None)
        return employee
    

    


if __name__=="__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

