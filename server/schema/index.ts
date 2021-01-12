import typeDefs from "./typeDefs"
import { Query as QUsers } from "./resolvers/users"
import { Query as QChats, Mutation as MChats } from "./resolvers/chats"
import {
  Query as QMessages,
  Mutation as MMessages,
  Subscription as SMessages,
} from "./resolvers/messages"
import {
  Subscription as SNotifications,
  Mutation as MNotifications,
  Query as QNotifications,
} from "./resolvers/notifications"
import {
  Query as QUnreadMessages,
  Mutation as MUnreadMessages,
} from "./resolvers/unreadmessages"
import {
  Mutation as MContentSets,
  Query as QContentSets,
} from "./resolvers/contentsets"
import { Chat } from "./resolvers/chat"
import { Message } from "./resolvers/message"
import { UserChat } from "./resolvers/userchat"
import { Notification } from "./resolvers/notification"
import { ContentSet } from "./resolvers/contentset"
import { UploadContent } from "./resolvers/uploadcontent"
import { Comment } from "./resolvers/comment"

const schema = {
  typeDefs,
  resolvers: {
    Query: {
      ...QUsers,
      ...QChats,
      ...QMessages,
      ...QNotifications,
      ...QUnreadMessages,
      ...QContentSets,
    },
    Mutation: {
      ...MChats,
      ...MMessages,
      ...MNotifications,
      ...MUnreadMessages,
      ...MContentSets,
    },
    Subscription: {
      ...SMessages,
      ...SNotifications,
    },
    Chat,
    Message,
    UserChat,
    Notification,
    ContentSet,
    UploadContent,
    Comment,
  },
}

export default schema
