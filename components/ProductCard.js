import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
  List,
  ListItem,
  Container,
} from "@material-ui/core/"
import Link from "next/link"
// import Likes from "./Likes"
// import { likeProduct } from "../redux/actions/productActions"

// import { useHistory } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    height: 200,
  },
})

const ProductCard = ({ product }) => {
  //   const history = useHistory()

  //   const user = JSON.parse(localStorage.getItem("userInfo"))

  //   const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    if (user) {
      //   dispatch(likeProduct(product._id))
      //   history.go(0)
    }
  }
  const classes = useStyles()

  //   useEffect(() => {}, [product.likes, dispatch, history])

  return (
    <>
      <Card style={{ height: "100%", padding: "0.75rem" }}>
        <Link href={`/product/${product._id}`}>
          {/* <Container> */}
          <CardActionArea>
            <CardMedia
              className={classes.root}
              image={product.selectedFile}
              title={product.title}
            />
            <CardHeader title={product.title} subheader={product.description} />
          </CardActionArea>
        </Link>
        <List>
          <ListItem>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: "0.8rem" }}
            >
              <Link
                href={`/product/${product._id}`}
                style={{ color: "white" }}
                underline="none"
              >
                Buy Now
              </Link>
            </Button>
            <Typography
              style={{ color: "black", marginLeft: "0.5rem" }}
              variant="h5"
            >
              £{product.price}
            </Typography>

            {/* <Button onClick={submitHandler} disabled={!user}>
              <Likes product={product} />
            </Button> */}
          </ListItem>
        </List>
        {/* </Container> */}
      </Card>
    </>
  )
}

export default ProductCard
