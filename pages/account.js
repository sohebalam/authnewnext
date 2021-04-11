import { parseCookies } from "nookies"

const Account = () => {
  return (
    <div>
      <h1>Account </h1>
    </div>
  )
}
export async function getServerSideProps(context) {
  const { token } = parseCookies(context)
  if (!token) {
    const { res } = context
    res.writeHead(302, { Location: "/auth/login" })
    res.end()
  }
  return {
    props: {},
  }
}
export default Account
