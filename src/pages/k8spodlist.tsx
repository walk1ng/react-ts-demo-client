import { Button, Select, Space, Table } from "antd";
import { Pod, Namespace } from "../models/k8s";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useEffect, useState } from "react";
import { get } from "http";
import axios from "axios";
import { R } from "../models/r";
import { ReloadOutlined, SyncOutlined } from "@ant-design/icons";
import ViewPodYaml from "./k8sviewpodyaml";

export default function PodList() {
  const columns: ColumnsType<Pod> = [
    {
      title: "UID",
      dataIndex: "uid",
    },
    {
      title: "Namespace",
      dataIndex: "namespace",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Phase",
      dataIndex: "phase",
    },
    {
      title: "Node",
      dataIndex: "node",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, pod) => {
        return (
          <Space>
            <Button size='small' type='primary' onClick={onViewYamlClick}>View Yaml</Button>
          </Space>
        )
      }
    },
  ];

  const [pods, setPods] = useState<Pod[]>([])
  const [namespaces, setNamespaces] = useState<Namespace[]>([])
  const [currentNs, setCurrentNs] = useState('default')
  const [spin, setSpin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [openYaml, setOpenYaml] = useState(false)

  async function getPods() {
    console.log('getting pods')
    const resp = await axios.get<R<Pod[]>>(
      `${process.env.API_URL}/api/pods?namespace=${currentNs}`,
    )
    setPods(resp.data.data)
    setLoading(false)
    setSpin(false)
  }

  async function getNs() {
    console.log('getting nss')
    const resp = await axios.get<R<Namespace[]>>(
      `${process.env.API_URL}/api/namespaces`,
    )
    setNamespaces(resp.data.data)
  }

  useEffect(() => {
    getNs()
    getPods()
  }, [currentNs, spin])

  function onReloadClick() {
    setSpin(!spin)
  }

  function onNsChange(value: string) {
    console.log(value)
    setCurrentNs(value)
    setLoading(true)
  }

  function onViewYamlClick() {
    setOpenYaml(true)
  }


  return (
    <>
    <ViewPodYaml open={openYaml}></ViewPodYaml>
      <Space>
        <Select style={{ width: 200 }} onChange={onNsChange} allowClear={true} >
          {namespaces.map(ns => <Select.Option value={ns.name} key={ns.uid}>{ns.name}</Select.Option>)}
          <Select.Option value='all' key='all'>all</Select.Option>
        </Select>
        <Button icon=<ReloadOutlined spin={spin} onClick={onReloadClick} />></Button>
      </Space>
      <Table columns={columns}
        dataSource={pods}
        rowKey='uid'
        loading={loading}
      >
      </Table>
    </>
  );
}
