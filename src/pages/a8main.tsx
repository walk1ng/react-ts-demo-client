import { AliwangwangOutlined, PicCenterOutlined, QqOutlined, TwitterOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import RouteStore from "../store/routes_store";
import { observer } from "mobx-react-lite";
import Icon from '../store/Icon'
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";

function A8Main() {
    // const items: ItemType[] = [
    //     // {key: '1', label:'xyz', icon:<AliwangwangOutlined />}
    //     {key: '1', label:'xyz', icon: <Icon name="AppleOutlined"></Icon> }
    // ]

    const nav =useNavigate()
    function onClick() {
        RouteStore.reset()
        nav('/login')
    }

    console.log('渲染main, username',RouteStore.username)

    if (RouteStore.username === '') {
        console.log('渲染main，发现username为空，跳转到Login')
        return <Navigate to='/login'></Navigate>
    } else {
        console.log('渲染main，发现username不为空，',RouteStore.username)
    }

    return <Layout>
        <Layout.Header> <span>欢迎您【用户#{RouteStore.userid} - {RouteStore.username}】</span> 
            <Button size='small' type='primary' onClick={onClick}>注销</Button>
        
        </Layout.Header>
        <Layout>
            <Layout.Sider>
                <Menu items={RouteStore.menus} theme='dark' mode='inline'></Menu>
            </Layout.Sider>
            <Layout.Content>
                <Outlet></Outlet>
            </Layout.Content>
        </Layout>
    </Layout>
}

export default observer(A8Main)