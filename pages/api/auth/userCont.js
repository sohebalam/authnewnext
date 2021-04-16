import User from "../../../models/userModel"
import bcrypt from "bcryptjs"
import Authenticated from "../../../utils/Authenticated"

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      return res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(404)
    throw new Error("User not found")
  }
}

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.firstName = req.body.firstName || user.firstName
      user.lastName = req.body.lastName || user.lastName
      user.email = req.body.email || user.email

      const salt = await bcrypt.genSalt(10)
      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, salt)
      }

      const updatedUser = await user.save()
      const token = jwt.sign(
        { email: updatedUser.email, id: updatedUser._id },
        config.secret,
        {
          expiresIn: "7d",
        }
      )

      return res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: token,
      })
    }
  } catch (error) {
    res.status(500)
    throw new Error("Server Error")
  }
}

//Admin Route
export const getUsers = Authenticated(async (req, res) => {
  if (req.user.role === "admin") {
    const users = await User.find().select("-password")
    res.json({ users })
  } else {
    res.json({ message: "not admin" })
  }
})

export const deleteUser = Authenticated(async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const user = await User.findById(req.query.id)

      if (user) {
        await user.remove()
        res.json({ success: "User removed" })
      }
    } catch (error) {
      res.status(404)
      throw new Error("User not found")
    }
  }
})

export const getUserById = Authenticated(async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const user = await User.findById(req.query.id).select("-password")
      // console.log(user)
      if (user) {
        res.json(user)
      }
    } catch (error) {
      res.status(404)
      throw new Error("User not found")
    }
  }
})

export const adminUpdateUser = Authenticated(async (req, res) => {
  if (req.user.role === "admin") {
    console.log(req.query, req.body)
    // try {
    //   const user = await User.findById(req.query.id)
    //   // // console.log(user)
    //   if (user) {
    //     if (req.query.role === true) {
    //       role = "admin"
    //     }
    //     user.firstName = req.body.firstName || user.firstName
    //     user.lastName = req.body.lastName || user.lastName
    //     user.email = req.body.email || user.email
    //     user.role = role
    //     const updatedUser = await user.save()

    //     return res.json({
    //       _id: updatedUser._id,
    //       firstName: updatedUser.firstName,
    //       lastName: updatedUser.lastName,
    //       email: updatedUser.email,
    //       role: updatedUser.role,
    //     })
    //   }
    // } catch (error) {
    //   console.error(error)
    //   res.status(500)
    //   throw new Error("Server Error")
    // }
  }
})
// export const google = async (req, res) => {
//   const { result } = req.body
//   const firstName = result.givenName
//   const lastName = result.familyName
//   const email = result.email

//   try {
//     const user = await User.findOne({ email })

//     if (user) {
//       return res.status(200).json({
//         _id: user._id,
//         firstName: user.firstName,

//         lastName: user.lastName,
//         email: user.email,

//         isAdmin: user.isAdmin,
//         token: generateToken(user._id),
//       })
//     } else {
//       const newUser = await User.create({
//         email: email,
//         password: "password",
//         lastName: lastName,
//         firstName: firstName,
//       })

//       if (newUser) {
//         res.status(201).json({
//           _id: newUser._id,
//           firstName: newUser.firstName,
//           lastName: newUser.lastName,
//           email: newUser.email,

//           isAdmin: newUser.isAdmin,
//           token: generateToken(newUser._id),
//           message:
//             "New User Created, please click here to change your defalut password",
//         })
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ messsage: "Something went wrong" })
//   }
// }
// export const registerUser = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body

//   const userExists = await User.findOne({ email })

//   if (userExists) {
//     res.status(400)
//     throw new Error("User already exists")
//   }
//   const salt = await bcrypt.genSalt(10)
//   const user = await User.create({
//     firstName,
//     lastName,
//     email,
//     password: await bcrypt.hash(password, salt),
//   })

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,

//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(400)
//     throw new Error("Invlaid user data")
//   }
// }

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body
//   const user = await User.findOne({ email })

//   const match = await bcrypt.compare(password, user.password)
//   if (!match) {
//     return res.status(400).json({ msg: "Invalid Credentials" })
//   }
//   if (user) {
//     return res.status(200).json({
//       _id: user._id,
//       firstName: user.firstName,

//       lastName: user.lastName,
//       email: user.email,

//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(401)
//     throw new Error("Invalid email or password")
//   }
// }

// export const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id)

//   if (user) {
//     return res.status(200).json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     })
//   } else {
//     res.status(404)
//     throw new Error("User not found")
//   }
// })

// export const google = async (req, res) => {
//   const { result } = req.body
//   const firstName = result.givenName
//   const lastName = result.familyName
//   const email = result.email

//   try {
//     const user = await User.findOne({ email })

//     if (user) {
//       return res.status(200).json({
//         _id: user._id,
//         firstName: user.firstName,

//         lastName: user.lastName,
//         email: user.email,

//         isAdmin: user.isAdmin,
//         token: generateToken(user._id),
//       })
//     } else {
//       const newUser = await User.create({
//         email: email,
//         password: "password",
//         lastName: lastName,
//         firstName: firstName,
//       })

//       if (newUser) {
//         res.status(201).json({
//           _id: newUser._id,
//           firstName: newUser.firstName,
//           lastName: newUser.lastName,
//           email: newUser.email,

//           isAdmin: newUser.isAdmin,
//           token: generateToken(newUser._id),
//           message:
//             "New User Created, please click here to change your defalut password",
//         })
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ messsage: "Something went wrong" })
//   }
// }
