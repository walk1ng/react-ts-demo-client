import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Hello from "./pages/hello";
import P1 from "./pages/p1";
import P2 from "./pages/p2";
import P3 from "./pages/p3";
import P5 from "./pages/p5";
import P6 from "./pages/p6";
import P7 from "./pages/p7";
import P8 from "./pages/p8";
import A1 from "./pages/a1";
import { ConfigProvider } from "antd";
// import zhCN from 'antd/es/locale/zh_CN'
import zhCN from "antd/locale/zh_CN";
import A2 from "./pages/a2";
import A4 from "./pages/a4";
import A5 from "./pages/a5";
import A6Delete from "./pages/a6delete";
import A6 from "./pages/a6";
import A6Update from "./pages/a6update";
import A6DeleteSelected from "./pages/a6deleteselected";
import A7 from "./pages/a7";
import MyRouter from "./router/myrouter";
import { BrowserRouter } from "react-router-dom";
import A8Login from "./pages/a8login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const student1 = {
  id: 1,
  name: "张无忌",
  gender: "男",
  age: 20,
  avatar: "/imgs/user1.png",
};

const student2 = {
  id: 2,
  name: "梅超风",
  gender: "女",
  age: 30,
  avatar: "/imgs/user2.png",
};

const student3 = {
  id: 3,
  name: "张翠山",
  gender: "男",
  age: 40,
  avatar: "/imgs/user3.png",
};

// root.render(
//   <React.StrictMode>
//     {/* <App></App> */}
//     {/* <P1 student={student1}></P1>
//     <P1 student={student2}></P1>
//     <P1 student={student3}></P1> */}
//     {/* <P2 students={[student1, student2, student3]} hidenAge={true}></P2> */}
//     <P3></P3>
//   </React.StrictMode >
// );

root.render(
  // <P6 id={3} age={18}></P6>
  // <P7></P7>
  // <P8></P8>
  // <ConfigProvider locale={zhCN}><A5></A5></ConfigProvider>
  <ConfigProvider locale={zhCN}>
    {/* <A6></A6> */}
    {/* <A7></A7> */}
    <BrowserRouter>
      <Suspense fallback={<h3>加载中...</h3>}>
        <MyRouter></MyRouter>
      </Suspense>
    </BrowserRouter>
    {/* <A8Login></A8Login> */}
  </ConfigProvider>
  // <ConfigProvider locale={zhCN}>
  //   <A6Update open={true} student={{id:13,name:'xx',age:100, gender:'男'}}></A6Update>
  // </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
