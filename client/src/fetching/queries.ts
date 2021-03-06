import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
  query LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        username
        email
        ava
        firstname
        lastname
        phone
        status
        address
        bio
        birth
        typeUser
        date
      }
      token
    }
  }
`

export const REGISTER_USER = gql`
  query REGISTER_USER($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
        ava
        firstname
        lastname
        phone
        status
        address
        bio
        birth
        typeUser
        date
      }
      token
    }
  }
`

export const GET_USER_CHATS = gql`
  query GET_USER_CHATS {
    userChats {
      id
      title
      channel
      description
      date
      image
      owner {
        id
      }
      owners {
        id
        username
        ava
        email
      }
      type
      lastMessage {
        id
        content
        date
        owner {
          id
          username
          email
        }
        chat {
          id
        }
      }
    }
  }
`

export const GET_USER_CHATS_ONLY = gql`
  query GET_USER_CHATS_ONLY($userId: ID) {
    userChats(userId: $userId) {
      id
      type
    }
  }
`

export const GET_USER_NOTIFICATIONS = gql`
  query GET_USER_NOTIFICATIONS {
    getNotifications {
      id
      title
      description
      channel
      active
      date
      type
      userId {
        id
        username
        email
        typeUser
        ava
      }
      chatId {
        id
        title
        type
        image
      }
    }
  }
`

export const GET_CHAT_USERS = gql`
  query GET_CHAT_USERS($chatId: ID!) {
    getChatUsers(chatId: $chatId) {
      id
      username
      email
      typeUser
      ava
    }
  }
`

export const GET_CHAT_MESSAGES = gql`
  query GET_CHAT_MESSAGES($chat: ID!) {
    chatMessages(chat: $chat) {
      id
      content
      date
      owner {
        id
        username
        ava
      }
      chat {
        id
      }
    }
  }
`

export const GET_UNREAD_MESSAGES = gql`
  query GET_UNREAD_MESSAGES {
    getUnreadMessages {
      id
      content
      date
      owner {
        id
        username
        ava
      }
      chat {
        id
      }
    }
  }
`

export const SEARCH_CHATS = gql`
  query SEARCH_CHATS($searchStr: String!) {
    searchChats(searchStr: $searchStr) {
      users {
        id
        username
        email
        ava
      }
      chats {
        id
        title
        image
        type
        owner {
          id
        }
      }
    }
  }
`
export const SEARCH_MESSAGES = gql`
  query SEARCH_MESSAGES($searchStr: String!, $chatId: String!) {
    searchMessages(searchStr: $searchStr, chatId: $chatId) {
      id
      content
      date
      owner {
        id
        username
        ava
      }
      chat {
        id
      }
    }
  }
`
export const GET_CHAT_INFO = gql`
  query GET_CHAT_INFO($isChat: Boolean!, $id: ID!) {
    getChatUserInfo(isChat: $isChat, id: $id) {
      user {
        id
        username
        email
        ava
        firstname
        lastname
        date
        typeUser
      }
      chat {
        id
        title
        description
        date
        image
        owner {
          id
          username
          email
          ava
          typeUser
        }
        type
      }
    }
  }
`

// commentsData {
//   content
//   date
//   owner {
//     id
//     username
//     email
//     ava
//     typeUser
//   }
//   likes
//   dislikes
//   replies
//   likeRecord {
//     liked
//   }
// }

export const GET_CONTENTSET_DETAILED = gql`
  query GET_CONTENTSET_DETAILED($contentSetId: ID!) {
    getContentSet(contentSetId: $contentSetId) {
      id
      owner {
        id
        username
        email
        ava
        typeUser
      }
      date
      content
      sticky
      category
      likes
      dislikes
      comments
      likeRecord {
        liked
      }
      image {
        location
        key
      }
      uploads {
        location
        key
      }
    }
  }
`

export const GET_CONTENTSETS = gql`
  query GET_CONTENTSETS(
    $category: String
    $userId: ID
    $from: Int!
    $to: Int!
    $sortKey: String
    $sortOrder: Int
  ) {
    getContentSets(
      category: $category
      userId: $userId
      from: $from
      to: $to
      sortKey: $sortKey
      sortOrder: $sortOrder
    ) {
      id
      owner {
        id
        username
        email
        ava
        typeUser
      }
      date
      category
      likes
      dislikes
      comments
      likeRecord {
        liked
      }
      image {
        location
        key
      }
    }
  }
`

export const GET_CONTENTSETS_USER = gql`
  query GET_CONTENTSETS_USER(
    $category: String
    $userId: ID
    $from: Int!
    $to: Int!
    $sortKey: String
    $sortOrder: Int
  ) {
    getContentSets(
      category: $category
      userId: $userId
      from: $from
      to: $to
      sortKey: $sortKey
      sortOrder: $sortOrder
    ) {
      id
      date
      category
      likes
      dislikes
      comments
      sticky
      likeRecord {
        liked
      }
      image {
        location
        key
      }
    }
  }
`

export const GET_CONTENTSET_SHORT = gql`
  query GET_CONTENTSET_SHORT($contentSetId: ID!) {
    getContentSet(contentSetId: $contentSetId) {
      id
      content
      category
    }
  }
`

export const TEST = gql`
  query TEST {
    TestQuery
  }
`
