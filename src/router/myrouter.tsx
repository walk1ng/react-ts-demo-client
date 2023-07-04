import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { lazy } from "react";
import RouteStore from "../store/routes_store";
import { observer } from "mobx-react-lite";

// 把字符串组件 -> 组件标签
export function load(name: string) {
  const Page = lazy(() => import(`../pages/${name}`));
  return <Page></Page>;
}

// 路由对象
function MyRouter() {
  const router =  useRoutes(RouteStore.routes);
  return router
}

export default observer(MyRouter)