import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Student } from "../models/student";
import { useEffect, useState } from "react";
import axios from "axios";
import { R } from "../models/r";

export default function A2() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getStudents() {
            const resp = await axios.get<R<Student[]>>(`http://192.168.80.163:8080/api/students`)
            setStudents(resp.data.data)
            setLoading(false)
        }

        getStudents()

    }, [])


    const columns: ColumnsType<Student> = [
        {
            title: '编号',
            dataIndex: 'id'
        },
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '性别',
            dataIndex: 'gender'
        },
        {
            title: '年龄',
            dataIndex: 'age'
        }
    ]
    return <Table
        columns={columns}
        dataSource={students}
        rowKey='id'
        loading={loading}
        >
    </Table>
}