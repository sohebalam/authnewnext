import React, { useEffect, useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"

import TextField from "@material-ui/core/TextField"
import { parseCookies } from "nookies"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import baseUrl from "../../../utils/baseUrl"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

import CreateIcon from "@material-ui/icons/Create"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const UserEditPage = (props) => {
  // const userId = router.query
  const classes = useStyles()

  useEffect(() => {
    setLastName(props.lastName)
    setFirstName(props.firstName)
    setEmail(props.email)
    // setRole(props.role)
  }, [])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  // const [role, setRole] = useState(false)

  // const id = userId
  const { _id: id } = props
  // console.log(id)

  const submitHandler = async (e) => {
    e.preventDefault()

    const { token } = parseCookies()

    const res = await fetch(`${baseUrl}/api/auth/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })

    const result = await res.json()
    console.log(result)
  }

  return (
    <Grid container>
      <Link href="/">
        <Button
          variant="outlined"
          underline="none"
          style={{ marginTop: "1rem" }}
        >
          {" "}
          Go Back
        </Button>
      </Link>
      <Container component="main" maxWidth="sm">
        <Grid item xs={12} sm={12}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <CreateIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Edit
            </Typography>

            <form className={classes.form} noValidate onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>

                {/* <RadioGroup
                  row
                  aria-label="gender"
                  name="User Type"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel
                    value="user"
                    control={<Radio />}
                    label="User"
                  />
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                  />
                </RadioGroup> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update
              </Button>

              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Container>
    </Grid>
  )
}

export default UserEditPage
export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx)
  if (!token) {
    const { res } = ctx
    res.writeHead(302, { Location: "/login" })
    res.end()
  }
  const { userId } = ctx.query
  const id = userId
  const res = await fetch(`${baseUrl}/api/auth/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
  const result = await res.json()
  // console.log(result)

  return {
    props: result,
  }
}
