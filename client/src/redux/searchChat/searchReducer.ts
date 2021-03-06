import {
  SET_SEARCH_CHAT,
  CLEAR_SEARCH_CHAT,
  SearchChatReducerTypes,
} from "./searchTypes"

interface IInitState {
  searchStr: string
}

const initState: IInitState = {
  searchStr: "",
}

const searchChatReducer = (
  state = initState,
  action: SearchChatReducerTypes
) => {
  switch (action.type) {
    case SET_SEARCH_CHAT:
      return {
        ...state,
        searchStr: action.payload,
      }
    case CLEAR_SEARCH_CHAT:
      return {
        ...state,
        searchStr: "",
      }
    default:
      return state
  }
}

export default searchChatReducer
