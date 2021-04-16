import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"
import nookies, { parseCookies } from "nookies"
import baseUrl from "../../utils/baseUrl"
const Userlist = ({ users }) => {
  return (
    <div>
      <h1>List of Users </h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>ROLE</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>ADMIN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.role}</TableCell>
              {user?.name ? (
                <TableCell>{user.name}</TableCell>
              ) : (
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
              )}
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Userlist

export async function getServerSideProps(ctx) {
  // console.log(ctx)
  const cookies = nookies.get(ctx)

  const { token } = cookies

  const res = await fetch(`${baseUrl}/api/auth/users`, {
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
    // pay: result2, // will be passed to the page component as props
  }
}
