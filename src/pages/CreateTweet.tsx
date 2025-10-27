import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { createTweet } from '../store/slices/tweetsSlice'
import { api } from '../api/client'
import { Form, Button, Card, Spinner } from 'react-bootstrap'

const schema = yup.object({
  content: yup.string().required().max(1000),
  recipients: yup.array().optional()
}).required();

export default function CreateTweet() {
  const { register, handleSubmit, setValue } = useForm({ resolver: yupResolver(schema) });
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoadingUsers(true);
    api.get('/users').then(r => setUsers(r.data)).catch(console.error).finally(() => setLoadingUsers(false));
  }, []);

  const onSubmit = async (data:any) => {
    try {
      await dispatch<any>(createTweet({ content: data.content, recipients: data.recipients || [] })).unwrap();
      alert('Tweet created');
      setValue('content','');
      setValue('recipients',[]);
    } catch (err:any) {
      alert(err?.response?.data?.message || err.message || 'Failed to create tweet');
    }
  }

  return (
    <Card className="p-3" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h3>Create Tweet</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-2">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={4} {...register('content')} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Share with (multi-select)</Form.Label>
          {loadingUsers ? <Spinner animation="border"/> : (
            <Form.Control as="select" multiple {...register('recipients')}>
              {users.map((u:any) => <option key={u.id} value={u.id}>{u.fullName || u.email}</option>)}
            </Form.Control>
          )}
        </Form.Group>
        <Button type="submit">Post Tweet</Button>
      </Form>
    </Card>
  )
}