import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { logout } from '../store/slices/authSlice'

export default function TopNav() {
  const token = useSelector((s:RootState) => s.auth.token)
  const dispatch = useDispatch()
  const nav = useNavigate()

  const doLogout = () => {
    dispatch(logout())
    nav('/login')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Twitter Clone</Navbar.Brand>
        <Nav className="me-auto">
          {token && <>
            <Nav.Link as={Link} to="/create">Create</Nav.Link>
            <Nav.Link as={Link} to="/my">My Tweets</Nav.Link>
            <Nav.Link as={Link} to="/shared">Shared</Nav.Link>
          </>}
        </Nav>
        <Nav>
          {!token ? (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          ) : (
            <Button variant="outline-secondary" onClick={doLogout}>Logout</Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}