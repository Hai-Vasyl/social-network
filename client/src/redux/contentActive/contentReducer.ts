import { SET_CONTENT_ACTIVE, ContentActiveReducerTypes } from "./contentTypes"
import { IContentSet } from "../../interfaces"

interface IInitState {
  contentActive: IContentSet
}

const initState: IInitState = {
  contentActive: {
    id: "",
    owner: {
      id: "",
      username: "",
      email: "",
      ava: "",
      typeUser: "",
    },
    date: "",
    content: "",
    sticky: false,
    category: "",
    likes: 0,
    dislikes: 0,
    comments: 0,
    likeRecord: {
      liked: true,
    },
    image: {
      location: "",
      key: "",
    },
    uploads: {
      location: "",
      key: "",
    },
  },
}

const contentReducer = (
  state = initState,
  action: ContentActiveReducerTypes
) => {
  switch (action.type) {
    case SET_CONTENT_ACTIVE:
      return {
        ...state,
        contentActive: action.payload,
      }
    default:
      return state
  }
}

export default contentReducer
