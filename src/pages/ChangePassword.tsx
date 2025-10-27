import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { api } from '../api/client'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'

const schema = yup.object({
  oldPassword: yup.string().min(6).required(),
  newPassword: yup.string().min(6).required()
}).required();

export default function ChangePassword() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const nav = useNavigate();

  const onSubmit = async (data:any) => {
    try {
      await api.post('/users/change-password', data);
      alert('Password changed - please login again');
      localStorage.removeItem('token');
      nav('/login');
    } catch (err:any) {
      alert(err?.response?.data?.message || err.message || 'Failed to change password');
    }
  }

  return (
    <Card className="p-3" style={{ maxWidth: 480, margin: '0 auto' }}>
      <h3>Change Password</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-2">
          <Form.Label>Old password</Form.Label>
          <Form.Control type="password" {...register('oldPassword')} />
          <small className="text-danger">{errors.oldPassword?.message as any}</small>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>New password</Form.Label>
          <Form.Control type="password" {...register('newPassword')} />
          <small className="text-danger">{errors.newPassword?.message as any}</small>
        </Form.Group>
        <Button type="submit">Change Password</Button>
      </Form>
    </Card>
  )
}