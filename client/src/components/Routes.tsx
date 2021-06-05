import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { RootStore } from "../redux/store"
import { IRoute } from "../interfaces"
import { routes } from "../modules/routes"
import { useSelector, useDispatch } from "react-redux"
import { RESET_TOGGLE } from "../redux/toggle/toggleTypes"

const Routes = () => {
  const {
    auth: { token, user },
    toggle: { dropDown, authForm, notifications, chat, content },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  // const mapReduce = (routes: IRoute[]): ReactNode => {
  //   return routes.map(({ exact, path, Component }) => {
  //     return (
  //       <Route
  //         key={path}
  //         exact={exact}
  //         path={path}
  //         component={(props: any) => <Component {...props} />}
  //       />
  //     )
  //   })
  // }

  const mapReduce = (routes: IRoute[]) => {
    return routes.map((route) => {
      return <Route key={route.path} {...route} />
    })
  }

  const getRoutes = () => {
    switch (user.typeUser) {
      case "admin":
        return mapReduce(routes.admin)
      case "user":
        return mapReduce(routes.user)
      default:
        return mapReduce(routes.unregistered)
    }
  }

  return (
    <>
      <div
        className={`background ${
          (dropDown || authForm || notifications || chat || content) &&
          "background--active"
        }`}
        onClick={() => dispatch({ type: RESET_TOGGLE })}
      ></div>
      <Switch>
        {getRoutes()}
        <Redirect to='/' />
      </Switch>
    </>
  )
}

export default Routes
