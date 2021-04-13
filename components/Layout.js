import { Container } from "@material-ui/core"
import React from "react"
import NavBar from "./NavBar"
import Footer from "../components/Footer"
import Modal from "./Dialog"

function Layout({ children }) {
  return (
    <Container>
      <NavBar />
      <Modal />
      {children}
      <Footer />
    </Container>
  )
}

export default Layout
