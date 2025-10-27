import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShared, fetchMyTweets } from '../store/slices/tweetsSlice'
import { RootState } from '../store'
import { Card, Spinner } from 'react-bootstrap'

export default function Dashboard() {
  const dispatch = useDispatch();
  const { my, shared, status } = useSelector((s: RootState) => s.tweets);

  useEffect(() => {
    // Fetch both personal and shared tweets to show a combined dashboard
    dispatch<any>(fetchMyTweets());
    dispatch<any>(fetchShared());
  }, [dispatch]);

  if (status === 'loading') {
    return <Spinner animation="border" />;
  }

  const combined = [
    ...my.map(t => ({ ...t, type: 'mine' })),
    ...shared.map(t => ({ ...t, type: 'shared' }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div>
      <h3>Dashboard</h3>
      {combined.length === 0 ? (
        <Card className="p-3">No tweets yet</Card>
      ) : (
        combined.map((t, i) => (
          <Card key={i} className="p-3 mb-2">
            <div className="d-flex justify-content-between">
              <strong>{t.author?.fullName || t.author?.email}</strong>
              <small>{new Date(t.createdAt).toLocaleString()}</small>
            </div>
            <div>{t.content}</div>
            <div>
              <small className="text-muted">
                {t.type === 'mine' ? 'You posted this' : 'Shared with you'}
              </small>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
