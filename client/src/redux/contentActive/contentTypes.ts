export const SET_CONTENT_ACTIVE = "SET_CONTENT_ACTIVE"
import { IContentSet } from "../../interfaces"

interface setContentActive {
  type: typeof SET_CONTENT_ACTIVE
  payload: IContentSet
}

export type ContentActiveReducerTypes = setContentActive
