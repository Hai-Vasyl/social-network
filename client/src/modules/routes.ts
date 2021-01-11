import Home from "../pages/Home"
import Profile from "../pages/Profile"
import CreateContentSet from "../pages/CreateContentSet"
import Bookmarks from "../pages/Bookmarks"
import Followers from "../pages/Followers"
import {
  BsBookmarks,
  BsHouse,
  // BsPerson,
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
// import { ILink } from "../interfaces"
// @ts-ignore
// import stylesNavbar from "../styles/navbar.module"

// export const getLinks = (userId: string): ILink[] => {
//   return [
//     {
//       to: "/",
//       exact: true,
//       Title: BsHouse,
//       className: stylesNavbar.link,
//       activeClassName: stylesNavbar.link__active,
//     },
//     {
//       to: "/bookmarks",
//       Title: BsBookmarks,
//       className: stylesNavbar.link,
//       activeClassName: stylesNavbar.link__active,
//     },
//     {
//       to: `/profile/${userId}`,
//       exact: true,
//       Title: BsPerson,
//       className: stylesNavbar.link_extend,
//       activeClassName: stylesNavbar.link__active,
//     },
//   ]
// }

const mainLinks = [
  {
    to: "/",
    exact: true,
    Title: BsHouse,
    // className: stylesNavbar.link,
    // activeClassName: stylesNavbar.link__active,
  },
  {
    to: "/bookmarks",
    Title: BsBookmarks,
    privet: true,
    // className: stylesNavbar.link,
    // activeClassName: stylesNavbar.link__active,
  },
  {
    to: "/followers",
    Title: BsPeople,
    privet: true,
    // className: stylesNavbar.link,
    // activeClassName: stylesNavbar.link__active,
  },
  {
    to: "/create-content",
    Title: BsCloudUpload,
    privet: true,
    // className: stylesNavbar.link,
    // activeClassName: stylesNavbar.link__active,
  },
  {
    Title: BsChatDots,
    btnKey: btnKeys.chat.keyWord,
    // className: stylesNavbar.link,
    // activeClassName: stylesNavbar.link__active,
  },
  {
    Title: BsBell,
    btnKey: btnKeys.notif.keyWord,
    // className: stylesNavbar.link,
    // activeClassName: stylesNavbar.link__active,
  },
]

export const links = {
  admin: [...mainLinks],
  user: [...mainLinks],
  unregistered: [...mainLinks],
}

const mainRoutes = [
  { path: "/", exact: true, Component: Home },
  { path: "/profile/:userId", exact: true, Component: Profile },
]

export const routes = {
  admin: [
    ...mainRoutes,
    { path: "/bookmarks", Component: Bookmarks },
    { path: "/create-content", Component: CreateContentSet },
    { path: "/followers", Component: Followers },
  ],
  user: [
    ...mainRoutes,
    { path: "/bookmarks", Component: Bookmarks },
    { path: "/create-content", Component: CreateContentSet },
    { path: "/followers", Component: CreateContentSet },
  ],
  unregistered: [...mainRoutes],
}
