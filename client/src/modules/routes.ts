import Home from "../pages/Home"
import Profile from "../pages/Profile"
import CreateContentSet from "../pages/CreateContentSet"
import Bookmarks from "../pages/Bookmarks"
import Followers from "../pages/Followers"
import ContentSet from "../pages/ContentSet"
import EditContentSet from "../pages/EditContentSet"
import ContentSets from "../pages/ContentSets"
import {
  BsBookmarks,
  BsHouse,
  BsChatDots,
  BsBell,
  BsCloudUpload,
  BsPeople,
} from "react-icons/bs"

export const btnKeys = {
  chat: {
    keyWord: "chat",
  },
  notif: {
    keyWord: "notification",
  },
}

const mainLinks = [
  {
    to: "/",
    exact: true,
    Title: BsHouse,
  },
  {
    to: "/bookmarks",
    Title: BsBookmarks,
    privet: true,
  },
  {
    to: "/followers",
    Title: BsPeople,
    privet: true,
  },
  {
    to: "/create-content",
    Title: BsCloudUpload,
    privet: true,
  },
  {
    Title: BsChatDots,
    btnKey: btnKeys.chat.keyWord,
  },
  {
    Title: BsBell,
    btnKey: btnKeys.notif.keyWord,
  },
]

export const links = {
  admin: [...mainLinks],
  user: [...mainLinks],
  unregistered: [...mainLinks],
}

const mainRoutes = [
  { path: "/", exact: true, Component: Home },
  { path: "/content-sets", exact: true, Component: ContentSets },
  { path: "/profile/:userId", exact: true, Component: Profile },
  { path: "/content-sets/:contentId", Component: ContentSet },
]

const userRoutes = [
  { path: "/bookmarks", Component: Bookmarks },
  { path: "/create-content", Component: CreateContentSet },
  { path: "/followers", Component: Followers },
  { path: "/edit-content/:contentId", Component: EditContentSet },
]

export const routes = {
  admin: [...mainRoutes, ...userRoutes],
  user: [...mainRoutes, ...userRoutes],
  unregistered: [...mainRoutes],
}
