import { Input, Select, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Student } from "../models/student";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PageR, QueryForm, R } from "../models/r";

export default function A5() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
        // showSizeChanger: true,
        // pageSizeOptions: [2, 5, 10, 20]
    })
    const [queryForm, setQueryForm] = useState<QueryForm>({})

    useEffect(() => {
        async function getStudents() {
            const resp = await axios.get<R<PageR<Student[]>>>(`http://192.168.80.163:8080/api/students/q`, {
                params: {
                    page: pagination.current,
                    size: pagination.pageSize,
                    ...queryForm
                }
            })
            setStudents(resp.data.data.list)
            setPagination((old) => {
                return { ...old, total: resp.data.data.total }
            })
            setLoading(false)
        }

        getStudents()

    }, [pagination.current, pagination.pageSize, queryForm])

    function onTableChange(newPagination: TablePaginationConfig) {
        setPagination(newPagination)
    }

    function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQueryForm((old) => {
            return { ...old, name: e.target.value }
        })
    }

    function onGenderChange(value: string) {
        setQueryForm((old) => {
            return { ...old, gender: value }
        })
    }

    function onAgeChange(value: string) {
        console.log(value)
        setQueryForm((old) => {
            return { ...old, age: value }
        })
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
    return (
        <div>
            <div>
                <Input style={{ width: 140 }} placeholder="请输入姓名" onChange={onNameChange}></Input>
                <Select style={{ width: 140 }} placeholder='请选择性别' allowClear={true} onChange={onGenderChange}>
                    <Select.Option value='男' >男</Select.Option>
                    <Select.Option value='女'>女</Select.Option>
                </Select>
                <Select style={{ width: 140 }} placeholder='请选择年龄' allowClear={true} onChange={onAgeChange}>
                    <Select.Option value='1,19'>20以下</Select.Option>
                    <Select.Option value='20,29'>20左右</Select.Option>
                    <Select.Option value='30,39'>30左右</Select.Option>
                    <Select.Option value='40,120'>40以上</Select.Option>
                </Select>

            </div>


            <Table
                columns={columns}
                dataSource={students}
                rowKey='id'
                loading={loading}
                pagination={pagination}
                onChange={onTableChange}
            ></Table>

        </div>

    )
}