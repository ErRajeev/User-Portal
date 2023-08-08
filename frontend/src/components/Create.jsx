import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState("")

  const navigate = useNavigate()

  const nameChangeHandle = (e) => setName(e.target.value)
  const emailChangeHandle = (e) => setEmail(e.target.value)
  const ageChangeHandle = (e) => setAge(e.target.value)

  const onSubmitHandle = async (e) => {
    e.preventDefault()
    const addUser = { name, email, age }
    console.log(addUser);
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = await response.json()
    if (!response.ok) {
      setTimeout(() => {
        setError("")
      }, 2000);
      setError(result.error)
    } else {
      setName("");
      setEmail("");
      setAge(0);
      setTimeout(() => {
        setSuccess("")
        navigate('/all')
      }, 2000);
      setSuccess("User Added")
    }
  }
  return (
    <>
      <div className='container my-2'>
        <h1 className="d-flex text-align-center align-items-center">Enter the Details</h1>
        {success && <div className="alert alert-success text-center" role="alert">{success}</div>}
        {error && <div className="alert alert-danger text-center"> {error}</div>}

        <form onSubmit={onSubmitHandle}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input type="text" className="form-control" id="exampleInputName" value={name} onChange={nameChangeHandle} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label"> Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={emailChangeHandle} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputAge" className="form-label">Your Age</label>
            <input type="text" className="form-control" id="exampleInputAge" value={age} onChange={ageChangeHandle} />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Create;
