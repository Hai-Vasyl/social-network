import { combineReducers } from "redux"
import authReducer from "./auth/authReducer"
import toggleReducer from "./toggle/toggleReducer"
import chatsReducer from "./chats/chatsReducer"
import chatActiveReducer from "./chatActive/chatActiveReducer"
import searchChatReducer from "./searchChat/searchReducer"
import searchMessageReducer from "./searchMessage/searchReducer"
import queueChatsReducer from "./queueChats/queueReducer"
import notificationsReducer from "./notifications/notifReducer"
import unreadMsgsReducer from "./unreadMsgs/msgsReducer"
import contentReducer from "./contentActive/contentReducer"
import contentsReducer from "./contents/contentsReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  toggle: toggleReducer,
  chats: chatsReducer,
  currentChat: chatActiveReducer,
  searchChat: searchChatReducer,
  searchMessage: searchMessageReducer,
  queueChats: queueChatsReducer,
  notifications: notificationsReducer,
  unreadMsgs: unreadMsgsReducer,
  content: contentReducer,
  contents: contentsReducer,
})

export default rootReducer
