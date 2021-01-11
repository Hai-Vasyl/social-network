import { AuthReducerTypes, SET_AUTH, LOGOUT_AUTH, Auth } from "./authTypes"

const initState: Auth = {
  token: "",
  user: {
    id: "",
    username: "",
    email: "",
    ava: "",
    firstname: "",
    lastname: "",
    phone: "",
    status: "",
    address: "",
    bio: "",
    birth: "",
    typeUser: "",
    date: "",
  },
}

const authReducer = (state = initState, action: AuthReducerTypes): Auth => {
  switch (action.type) {
    case SET_AUTH:
      if (action.payload.init) {
        return action.payload.auth
      }
      localStorage.setItem("auth", JSON.stringify(action.payload.auth))
      return action.payload.auth
    case LOGOUT_AUTH:
      localStorage.removeItem("auth")
      return initState
    default:
      return state
  }
}

export default authReducer
