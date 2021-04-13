import connectDB from "../../../utils/connectDB"
import { addOrderItems } from "./controller/orderCont"

connectDB()

export default async (req, res) => {
  switch (req.method) {
    // case "GET":
    //   await getProduct(req, res)
    //   break
    case "POST":
      await addOrderItems(req, res)
      break
    // case "DELETE":
    //   await deleteProduct(req, res)
    //   break
  }
}
