import React, { useState } from 'react'
import api from '../../api'

export default function Signup(props) {
  const [state, setState] = useState({
    email: '',
    name: '',
    password: '',
    message: null,
  })

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function handleClick(e) {
    e.preventDefault()
    let data = {
      email: state.email,
      name: state.name,
      password: state.password,
    }
    api
      .signup(data)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setState({ message: err.toString() }))
  }
  return (
    <div className="Signup container">
      <h2>Signup</h2>
      <form>
        Email
        <input
          className="form-control"
          type="email"
          value={state.email}
          name="email"
          onChange={handleInputChange}
        />{' '}
        <br />
        Password
        <input
          className="form-control"
          type="password"
          value={state.password}
          name="password"
          onChange={handleInputChange}
        />{' '}
        <br />
        <button className="btn btn-danger" onClick={e => handleClick(e)}>
          Signup
        </button>
      </form>
      {state.message && <div className="info info-danger">{state.message}</div>}
    </div>
  )
}
