import React, { useContext, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
// import logo from "../image/v3.jpg"
// import logo from "../image/v3.png"
import Image from "next/image"
import { Button, Typography, Link, Box, Badge } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import AssignmentIcon from "@material-ui/icons/Assignment"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { DataContext } from "../store/GlobalState"
import cookie from "js-cookie"
import { useRouter } from "next/router"
import PublishIcon from "@material-ui/icons/Publish"
import { parseCookies } from "nookies"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function NavBar() {
  const cookieuser = parseCookies()
  const user = cookieuser.user ? JSON.parse(cookieuser.user) : ""
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state
  const router = useRouter()
  const classes = useStyles()
  const registerHandler = () => {}
  const logoutHandler = () => {
    cookie.remove("token")
    cookie.remove("user")
    router.push("/auth/login")
  }
  const loginHandler = () => {}

  return (
    <div>
      {/* <Container> */}
      <AppBar position="static" style={{ color: "primary" }}>
        <Toolbar>
          <Link href="/">
            <IconButton>
              <Image src="/v3.png" alt="me" width="45" height="45" />
              {/* <img src="../public/v3.png" /> */}
            </IconButton>
          </Link>

          <Typography variant="h6" className={classes.title}>
            OpenFreeUni
          </Typography>
          <>
            {/* {Object.keys(auth).length ? ( */}
            <>
              <Box
                style={{
                  marginRight: "0.25rem",
                  marginLeft: "0.75rem",
                  marginTop: "0.75",
                }}
              >
                <Typography style={{ marginTop: "0.25rem" }}>
                  {" "}
                  {/* Hello {auth.user?.firstName} {auth.user?.lastName} */}
                </Typography>
              </Box>
              <Box
                style={{
                  marginTop: "0.25rem",
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right",
                }}
              >
                <Link style={{ color: "white" }} href="/cart/cart">
                  <Button
                    color="inherit"
                    onClick={logoutHandler}
                    style={{ marginRight: "0.7rem" }}
                  >
                    <Badge
                      badgeContent={cart?.length}
                      color="secondary"
                      style={{ marginRight: "0.25rem" }}
                    >
                      <ShoppingCartIcon style={{ marginRight: "0.25rem" }} />
                    </Badge>
                    Cart
                  </Button>
                </Link>
                {(user.role === "admin" || user.role === "root") && (
                  <Link style={{ color: "white" }} href="/product/upload">
                    <Button color="inherit" style={{ marginRight: "0.5rem" }}>
                      <PublishIcon style={{ marginRight: "0.25rem" }} />
                      upload
                    </Button>
                  </Link>
                )}
                {user ? (
                  <Button
                    color="inherit"
                    onClick={logoutHandler}
                    style={{ marginRight: "0.5rem" }}
                  >
                    <ExitToAppIcon style={{ marginRight: "0.25rem" }} />
                    LogOut
                  </Button>
                ) : (
                  <>
                    <Link style={{ color: "white" }} href="/auth/register">
                      <Button color="inherit" onClick={registerHandler}>
                        <AssignmentIcon style={{ marginRight: "0.25rem" }} />
                        Register
                      </Button>
                    </Link>
                    <Link style={{ color: "white" }} href="/auth/login">
                      <Button color="inherit" onClick={loginHandler}>
                        <PersonIcon style={{ marginRight: "0.25rem" }} />
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </Box>
            </>

            <> </>
          </>
        </Toolbar>
      </AppBar>
      {/* </Container> */}
    </div>
  )
}
