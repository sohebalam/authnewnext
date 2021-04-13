import Order from "../../../../models/orderModel"

export const addOrderItems = async (req, res) => {
  const { orderItems, address, paymentMethod, subtotal, tax, total } = req.body
  try {
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error("No order items")
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        address,
        paymentMethod,
        subtotal,
        tax,
        total,
      })

      const createdOrder = await order.save()

      res.status(201).json(createdOrder)
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "firstName lastName email"
  )
  try {
    if (order) {
      res.json(order)
    }
  } catch (error) {
    res.status(404)
    throw new Error("Order not found")
  }
}

export const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id)
  try {
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    }
  } catch (error) {
    res.status(404)
    throw new Error("Order not found")
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ messsage: "Server Error" })
  }
}
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "id firstName lastName")
    res.json(orders)
  } catch (error) {
    res.status(500).json({ messsage: "Server Error" })
  }
}
