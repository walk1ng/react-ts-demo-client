export interface Route {
  path: string;
  element: string;
}

export interface MyMenu {
  id: string;
  title: string;
  children?: MyMenu[];
  icon: string;
  routePath: string;
}

export interface RouteAndMenu {
    routeList: Route[]
    menuTree?: MyMenu[]
}

export interface LoginReq {
  username: string
  password: string
}

export interface LoginResp {
  token: string
}