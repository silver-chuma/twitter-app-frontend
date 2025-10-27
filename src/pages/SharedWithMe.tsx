import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShared } from '../store/slices/tweetsSlice'
import { RootState } from '../store'
import { Card, Spinner } from 'react-bootstrap'

export default function SharedWithMe() {
  const dispatch = useDispatch();
  const shared = useSelector((s:RootState) => s.tweets.shared);
  const status = useSelector((s:RootState) => s.tweets.status);

  useEffect(() => {
    dispatch<any>(fetchShared());
  }, []);

  return (
    <div>
      <h3>Shared With Me</h3>
      {status==='loading' && <Spinner animation="border" />}
      {shared.length === 0 && status !== 'loading' && <Card className="p-3">No shared tweets</Card>}
      {shared.map(s => (
        <Card key={s.tweet.id} className="p-3 mb-2">
          <div><strong>{s.tweet.author?.fullName || s.tweet.author?.email}</strong> — {new Date(s.sharedAt).toLocaleString()}</div>
          <div>{s.tweet.content}</div>
        </Card>
      ))}
    </div>
  )
}