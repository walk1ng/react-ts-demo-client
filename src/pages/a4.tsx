import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Student } from "../models/student";
import { useEffect, useState } from "react";
import axios from "axios";
import { PageR, R } from "../models/r";

export default function A4() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: [2, 5, 10, 20]
    })

    useEffect(() => {
        async function getStudents() {
            const resp = await axios.get<R<PageR<Student[]>>>(`http://192.168.80.163:8080/api/students/q`, {
                params: {
                    page: pagination.current,
                    size: pagination.pageSize
                }
            })
            setStudents(resp.data.data.list)
            setPagination((old) => {
                return { ...old, total: resp.data.data.total }
            })
            setLoading(false)
        }

        getStudents()

    }, [pagination.current, pagination.pageSize])

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