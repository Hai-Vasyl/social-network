export const SET_CONTENTS = "SET_CONTENTS"
import { IContentSet } from "../../interfaces"

interface setContents {
  type: typeof SET_CONTENTS
  payload: IContentSet[]
}

export type ContentsReducerTypes = setContents
