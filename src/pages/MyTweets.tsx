import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyTweets } from '../store/slices/tweetsSlice'
import { RootState } from '../store'
import { Card, Spinner } from 'react-bootstrap'

export default function MyTweets() {
  const dispatch = useDispatch();
  const my = useSelector((s:RootState) => s.tweets.my);
  const status = useSelector((s:RootState) => s.tweets.status);

  useEffect(() => {
    dispatch<any>(fetchMyTweets());
  }, []);

  return (
    <div>
      <h3>My Tweets</h3>
      {status==='loading' && <Spinner animation="border" />}
      {my.length === 0 && status !== 'loading' && <Card className="p-3">No tweets yet</Card>}
      {my.map(t => (
        <Card key={t.id} className="p-3 mb-2">
          <div><strong>{t.author?.fullName || t.author?.email}</strong> — {new Date(t.createdAt).toLocaleString()}</div>
          <div>{t.content}</div>
        </Card>
      ))}
    </div>
  )
}