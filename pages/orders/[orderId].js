import { parseCookies } from "nookies"
import nookies from "nookies"
import { Alert } from "@material-ui/lab"
import baseUrl from "../../utils/baseUrl"
import { getData } from "../../utils/fetchData"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  Grid,
  Button,
  Link,
  Typography,
  Box,
  Card,
  List,
  CardMedia,
  makeStyles,
  CardContent,
  CardActions,
  CircularProgress,
} from "@material-ui/core"
import Image from "next/image"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const OrderId = (props) => {
  const [sdkReady, setSdkReady] = useState(false)
  const [loadingPay, setloadingPay] = useState("")

  const classes = useStyles()
  const order = props

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const subtotal = addDecimals(
    order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  )

  return (
    <>
      <h1>Order {order._id}</h1>
      <Grid container>
        <Grid item md={8}>
          <Card>
            <Box padding="1rem">
              <Box>
                <List>
                  <Box>
                    <strong>Name: </strong> {order.user.firstName},{" "}
                    {order.user.lastName}
                  </Box>
                  <Box>
                    <strong>Email: </strong>
                    <a href={`mailto: ${order.user.email}`}>
                      {" "}
                      {order.user.email}
                    </a>
                  </Box>
                </List>
                <Typography>
                  <strong> Address:</strong>
                  {order.address.address}, {order.address.city} ,{" "}
                  {order.address.postalCode}, {order.address.country}
                </Typography>
              </Box>
              <hr />
              <Box>
                <Typography>
                  <strong>Payment Method: </strong> {order.paymentMethod},
                </Typography>
                <Typography>
                  {order.isPaid ? (
                    <Alert severity="success">Paid on {order.paidAt}</Alert>
                  ) : (
                    <Alert severity="warning">Not Paid</Alert>
                  )}
                </Typography>
              </Box>
              <hr />
              <Box>
                <List>
                  <strong>Order Items:</strong>{" "}
                  {order.orderItems === 0 ? (
                    <Alert>Order is empty</Alert>
                  ) : (
                    <List>
                      {order.orderItems.map((item, index) => (
                        <List key={index}>
                          <Grid container item>
                            <Grid item md={1} style={{ padding: "0rem" }}>
                              <Image
                                src={item.selectedFile}
                                height="50rem"
                                width="50rem"
                              />
                            </Grid>
                            <Grid item style={{ padding: "0.5rem" }}>
                              <Link href={`/product/${item._id}`} />
                              {item.title}
                            </Grid>
                            <Grid item md={4} style={{ padding: "0.5rem" }}>
                              {item.quantity} x £{item.price} = £
                              {item.quantity * item.price}
                            </Grid>
                          </Grid>
                        </List>
                      ))}
                    </List>
                  )}{" "}
                </List>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item md={4}>
          <Card className={classes.root} style={{ marginLeft: "1rem" }}>
            <CardContent>
              <Grid container style={{ padding: "0.25rem" }}>
                <Box style={{ marginInlineStart: "2.5rem" }}>
                  <Typography
                    variant="h4"
                    component="h4"
                    color="textPrimary"
                    gutterBottom
                  >
                    Order Summary
                  </Typography>
                </Box>
                <Grid item md={6}>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Price of Items:
                  </Typography>

                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Tax:
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Total:
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{subtotal}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{order.tax}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{order.total}
                  </Typography>
                </Grid>
                <CardActions>
                  {!order.isPaid && (
                    <List>
                      {loadingPay && <Alert />}
                      {!sdkReady ? (
                        <Alert />
                      ) : (
                        <PayPalButton
                          amount={order.total}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </List>
                  )}
                </CardActions>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default OrderId

export async function getServerSideProps(ctx) {
  // console.log(ctx)
  const cookies = nookies.get(ctx)
  // const res = await getData(`orders/order/${OrderId}`)

  const { token } = cookies
  const { orderId } = ctx.query
  // console.log(token, ctx.query.orderId)

  const res = await fetch(`${baseUrl}/api/orders/order/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })

  const result = await res.json()
  // console.log(result)
  // server side rendering
  return {
    props: result, // will be passed to the page component as props
  }
}

// import { getOrderDetails, payOrder } from "../../redux/actions/orderActions"
// import axios from "axios"
// import { Alert } from "@material-ui/lab"
// import { PayPalButton } from "react-paypal-button-v2"
// import { ORDER_PAY_RESET } from "../../redux/constants/actionTypes"

// const OrderPage = ({ match, history }) => {
//
//   const orderId = match.params.id

//   const [sdkReady, setSdkReady] = useState(false)

//   const dispatch = useDispatch()

//   const orderDetails = useSelector((state) => state.orderDetails)
//   const { order, loading, error } = orderDetails

//   const orderPay = useSelector((state) => state.orderPay)
//   const { loading: loadingPay, success: successPay } = orderPay

//   useEffect(() => {
//     const addPayPalScript = async () => {
//       const { data: clientId } = await axios.get("/config/paypal")

//       const script = document.createElement("script")
//       script.type = "text/javascript"
//       script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
//       script.async = true
//       script.onload = () => {
//         setSdkReady(true)
//       }
//       document.body.appendChild(script)
//     }

//     if (!order || order._id !== orderId || successPay) {
//       dispatch({ type: ORDER_PAY_RESET })
//       dispatch(getOrderDetails(orderId))
//     } else if (!order.isPaid) {
//       if (!window.paypal) {
//         addPayPalScript()
//       } else {
//         setSdkReady(true)
//       }
//     }
//   }, [order, orderId, successPay, dispatch])

//   const userLogin = useSelector((state) => state.userLogin)
//   const { userInfo } = userLogin

//   if (!loading) {
//     //   Calculate prices

// useEffect(() => {
//   if (!userInfo) {
//     history.push("/login")
//   }

//   if (!order || successPay || successDeliver || order._id !== orderId) {
//     // dispatch({ type: ORDER_PAY_RESET })
//     // dispatch({ type: ORDER_DELIVER_RESET })
//     dispatch(getOrderDetails(orderId))
//   } else if (!order.isPaid) {
//     if (!window.paypal) {
//       addPayPalScript()
//     } else {
//       setSdkReady(true)
//     }
//   }
// }, [dispatch, orderId, successPay, successDeliver, order])

// const successPaymentHandler = (paymentResult) => {
//   console.log(paymentResult)
//   dispatch(payOrder(orderId, paymentResult))
// }

//   return loading ? (
//     <CircularProgress />
//   ) : error ? (
//     <Alert severity="warning">{error}</Alert>
//   ) : (

//   )
// }
