import { makeAutoObservable, runInAction } from "mobx";
import { LoginReq, LoginResp, MyMenu, Route, RouteAndMenu } from "../models/route";
import axios from "axios";
import { R } from "../models/r";
import { Link, Navigate, RouteObject } from "react-router-dom";
import { load } from "../router/myrouter";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { AliwangwangOutlined } from "@ant-design/icons";
import Icon from "./Icon"; // 根据实际的文件路径进行导入

function convertMenu(m: MyMenu): ItemType {
  console.log("menu:", m);
  const Label = m.routePath ? <Link to={m.routePath}>{m.title}</Link> : m.title;
  const it = {
    key: m.id,
    label: Label,
    icon: <Icon name={m.icon} />,
    // icon: <AliwangwangOutlined />,
    children: m.children && m.children.map(convertMenu),
  };
  // console.log('ItemType:',it)
  return it;
}

class RoutesStore {
  dynamicRoutes: Route[] = [];
  dynamicMenus: MyMenu[] = [];
  token: string = "";
  state: string = 'pending'
  message: string = ''

  async login(loginReq: LoginReq) {
    console.log('logining....')
    this.state = 'pending'
    const resp1 = await axios.post<R<LoginResp>>('http://192.168.80.163:8080/api/login', loginReq)
    // 登录成功
    if (resp1.data.code === 999) {
      console.log("fetch menu and routes");
      const resp2 = await axios.get<R<RouteAndMenu>>(
        `http://192.168.80.163:8080/api/menu/${loginReq.username}`
      );
      console.log(resp2.data.data);
      runInAction(() => {
        this.dynamicRoutes = resp2.data.data.routeList;
        localStorage.setItem("dynamicRoutes", JSON.stringify(this.dynamicRoutes));

        this.dynamicMenus = resp2.data.data.menuTree
          ? resp2.data.data.menuTree
          : [];
        localStorage.setItem("dynamicMenus", JSON.stringify(this.dynamicMenus));

        console.log("this.dynamicMenus:", this.dynamicMenus);

        this.token = resp1.data.data.token
        localStorage.setItem('token', this.token)
        console.log('mark login done')
        this.state = 'done'
        this.message = resp1.data.message ?? ''
        console.log('runInAction',this.state,this.message)
    });
    } else { // 登录失败
      console.log('login failed')
      runInAction(()=>{
        this.state = 'error'
        this.message = resp1.data.message ?? ''
      })
    }

    console.log('login resp',resp1)
    console.log('route_store',this)
  }

  async fetch(username: string) {
    console.log("fetch");
    const resp = await axios.get<R<RouteAndMenu>>(
      `http://192.168.80.163:8080/api/menu/${username}`
    );
    console.log(resp.data.data);
    runInAction(() => {
      this.dynamicRoutes = resp.data.data.routeList;
      localStorage.setItem("dynamicRoutes", JSON.stringify(this.dynamicRoutes));

      this.dynamicMenus = resp.data.data.menuTree
        ? resp.data.data.menuTree
        : [];
      localStorage.setItem("dynamicMenus", JSON.stringify(this.dynamicMenus));

      console.log("this.dynamicMenus:", this.dynamicMenus);
    });
  }

  get routes() {
    console.log("get routes");
    // 静态路由表
    const staticRoutes: RouteObject[] = [
      {
        path: "/",
        element: load("a8main"),
        children: [],
      },
      { path: "/login", element: load("a8login") },
      { path: "/pods", element: load("k8spodlist") },
      { path: "/404", element: load("a8notfound") },
      { path: "/*", element: <Navigate to={"/404"}></Navigate> },
    ];

    console.log("this.dynamicRoutes: ", this.dynamicRoutes);

    staticRoutes[0].children = this.dynamicRoutes.map((r) => {
      return {
        path: r.path,
        element: load(r.element),
      };
    });

    console.log(staticRoutes);
    return staticRoutes;
  }

  get menus() {
    return this.dynamicMenus.map(convertMenu);
  }

  get username() {
    if (this.token.length === 0) {
      console.log('未取到token')
      return ''
    }
    const payload = this.token.split('.')[1]
    const json = atob(payload)
    const userinfo = JSON.parse(json)
    return userinfo.username
  }

  get userid() {
    if (this.token.length === 0) {
      console.log('未取到token')
      return ''
    }
    const payload = this.token.split('.')[1]
    const json = atob(payload)
    const userinfo = JSON.parse(json)
    return userinfo.userId
  }

  constructor() {
    console.log("route store construct");
    makeAutoObservable(this);

    const json = localStorage.getItem("dynamicRoutes");
    this.dynamicRoutes = json ? JSON.parse(json) : [];

    const json1 = localStorage.getItem("dynamicMenus");
    this.dynamicMenus = json1 ? JSON.parse(json1) : [];

    this.token = localStorage.getItem('token') ?? ''

    this.state = 'pending'
    this.message = ''
  }

  reset() {
    localStorage.removeItem("dynamicRoutes");
    this.dynamicRoutes = [];

    localStorage.removeItem("dynamicMenus");
    this.dynamicMenus = [];

    localStorage.removeItem('token')
    this.token = ''

    this.state = 'pending'
    this.message = ''
  }
}

export default new RoutesStore();
