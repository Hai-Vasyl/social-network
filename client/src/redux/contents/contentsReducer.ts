import { ContentsReducerTypes, SET_CONTENTS } from "./contentsTypes"
import { IContentSet } from "../../interfaces"

interface IInitState {
  contents: IContentSet[]
}

const initState: IInitState = {
  contents: [],
}

const contentsReducer = (state = initState, action: ContentsReducerTypes) => {
  switch (action.type) {
    case SET_CONTENTS:
      return {
        ...state,
        contents: action.payload,
      }
    default:
      return state
  }
}

export default contentsReducer
