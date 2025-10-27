import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store'
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
}).required();

export default function Login() {
  const { register: r, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const nav = useNavigate();
  const status = useSelector((s: RootState) => s.auth.status);
  const error = useSelector((s: RootState) => s.auth.error);

  const onSubmit = async (data:any) => {
    try {
      await dispatch<any>(login(data)).unwrap();
      nav('/');
    } catch (err:any) {
    }
  }

  return (
    <Card className="p-3" style={{ maxWidth: 480, margin: '0 auto' }}>
      <h3>Login</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" {...r('email')} />
          <small className="text-danger">{errors.email?.message as any}</small>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" {...r('password')} />
          <small className="text-danger">{errors.password?.message as any}</small>
        </Form.Group>
        <Button type="submit" disabled={status==='loading'}>
          {status==='loading' ? <><Spinner animation="border" size="sm" /> Logging in...</> : 'Login'}
        </Button>
      </Form>
    </Card>
  )
}