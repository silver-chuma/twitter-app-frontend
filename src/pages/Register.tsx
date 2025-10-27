import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { register as doRegister } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const schema = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  fullName: yup.string().optional()
}).required();

export default function Register() {
  const { register: r, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onSubmit = async (data:any) => {
    try {
      await dispatch<any>(doRegister(data)).unwrap();
      toast.success('✅ Registered successfully! Please login.', { autoClose: 5000 });
      setTimeout(() => nav('/login'), 1500); // navigate after a short delay
    } catch (err:any) {
      toast.error(err?.response?.data?.message || err.message || 'Registration failed', { autoClose: 3000 });
    }
  }

  return (
    <Card className="p-3" style={{ maxWidth: 480, margin: '0 auto' }}>
      <h3>Register</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-2">
          <Form.Label>Full name</Form.Label>
          <Form.Control {...r('fullName')} />
          <small className="text-danger">{errors.fullName?.message as any}</small>
        </Form.Group>
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
        <Button type="submit" className="w-100 mt-2">Register</Button>
      </Form>

      {/* Toast notification container */}
      <ToastContainer position="top-right" hideProgressBar />
    </Card>
  )
}
