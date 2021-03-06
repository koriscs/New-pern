import React from 'react'
import { Container } from 'react-bootstrap'
import Navigation from './Navigation'

export default function Layout({ children }) {
  return (
    <div>
        <Navigation />
        <Container>{children}</Container>
    </div>
  )
}
