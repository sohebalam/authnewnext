import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core"
import nookies, { parseCookies } from "nookies"
import baseUrl from "../../utils/baseUrl"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Alert } from "@material-ui/lab"
import { useRouter } from "next/router"
// import Image from "next/image"

const Productslist = () => {
  const { user } = parseCookies()
  // console.log(user.role)
  const router = useRouter()
  const [messageTwo, setMessageTwo] = useState("")

  useEffect(() => {
    if (!user?.role === "admin" || !user?.role === "root" || message)
      router.push("/")
  }, [])

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      const { token } = parseCookies()
      const res = await fetch(`${baseUrl}/api/auth/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      const result = await res.json()
      const { success } = result
      setMessageTwo(success)
      console.log(messageTwo, "success", success, res)
    }
  }
  return (
    <div>
      {/* <h1>List of Products </h1>
      {(message || messageTwo) && (
        <Alert severity="error">{message || messageTwo}</Alert>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product._id}</TableCell>
              <TableCell>
                <Image
                  src={product.selecetedFile}
                  height="40rem"
                  width="40rem"
                />
              </TableCell>
              <TableCell>{product.title}</TableCell>

              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Link
                  href={`/admin/product/${product._id}`}
                  // as={`/admin/useredit/${userId}`}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: "0.5rem" }}
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteHandler(user._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </div>
  )
}

export default Productslist

export async function getServerSideProps(ctx) {
  // console.log(ctx)
  const cookies = nookies.get(ctx)

  const { token } = cookies

  const res = await fetch(`${baseUrl}/api/product/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
  const result = await res.json()
  console.log(result)
  // server side rendering
  return {
    props: result, // will be passed to the page component as props
    // pay: result2, // will be passed to the page component as props
  }
}
