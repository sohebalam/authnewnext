import { createContext, useReducer, useEffect } from "react"
import reducers from "./Reducers"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, cart: [] }
  const [state, dispatch] = useReducer(reducers, initialState)
  const { cart } = state

  useEffect(() => {
    const cart_update = JSON.parse(localStorage.getItem("cart_update"))

    if (cart_update) dispatch({ type: "ADD_CART", payload: cart_update })
  }, [])

  useEffect(() => {
    localStorage.setItem("cart_update", JSON.stringify(cart))
  }, [cart])

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  )
}
