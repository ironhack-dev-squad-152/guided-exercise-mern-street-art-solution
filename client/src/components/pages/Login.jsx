import React, { useState } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'

export default function Login(props) {
  const { formValues, getInputProps } = useForm({ lang: 'en' })

  function handleSubmit(e) {
    e.preventDefault()
    api
      .login(formValues.email, formValues.password)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setMessage(err.toString()))
  }

  const [message, setMessage] = useState(null)

  return (
    <div className="Login container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        Email
        <input
          className="form-control"
          type="text"
          {...getInputProps('email')}
        />{' '}
        <br />
        Password
        <input
          className="form-control"
          type="password"
          {...getInputProps('password')}
        />{' '}
        <br />
        <button className="btn btn-danger">Login</button>
      </form>
      {message && <div className="info info-danger">{message}</div>}
    </div>
  )
}
