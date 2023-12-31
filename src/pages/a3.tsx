import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Student } from "../models/student";
import { useEffect, useState } from "react";
import axios from "axios";
import { R } from "../models/r";

export default function A3() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState<TablePaginationConfig>({current:1, pageSize:5})

    useEffect(() => {
        async function getStudents() {
            const resp = await axios.get<R<Student[]>>(`${process.env.API_URL}/api/students`)
            setStudents(resp.data.data)
            setLoading(false)
        }

        getStudents()

    }, [])

    function onTableChange(newPagination: TablePaginationConfig) {
        setPagination(newPagination)
    }

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
        pagination={pagination}
        onChange={onTableChange}
        >
    </Table>
}