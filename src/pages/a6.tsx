import { Button, Input, Select, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Student } from "../models/student";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PageR, QueryForm, R } from "../models/r";
import { render } from "@testing-library/react";
import A6Delete from "./a6delete";
import A6Update from "./a6update";
import A6Insert from "./a6insert";
import A6DeleteSelected from "./a6deleteselected";

export default function A6() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
        // showSizeChanger: true,
        // pageSizeOptions: [2, 5, 10, 20]
    });
    const [queryForm, setQueryForm] = useState<QueryForm>({});

    useEffect(() => {
        async function getStudents() {
            const resp = await axios.get<R<PageR<Student[]>>>(
                `http://192.168.80.163:8080/api/students/q`,
                {
                    params: {
                        page: pagination.current,
                        size: pagination.pageSize,
                        ...queryForm,
                    },
                }
            );
            setStudents(resp.data.data.list);
            setPagination((old) => {
                return { ...old, total: resp.data.data.total };
            });
            setLoading(false);
        }

        getStudents();
    }, [pagination.current, pagination.pageSize, queryForm]);

    function onTableChange(newPagination: TablePaginationConfig) {
        setPagination(newPagination);
    }

    function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQueryForm((old) => {
            return { ...old, name: e.target.value };
        });
    }

    function onGenderChange(value: string) {
        setQueryForm((old) => {
            return { ...old, gender: value };
        });
    }

    function onAgeChange(value: string) {
        console.log(value);
        setQueryForm((old) => {
            return { ...old, age: value };
        });
    }

    function onDeleteSuccess() {
        setQueryForm((old) => {
            return { ...old };
        });
    }

    function onUpdateSuccess() {
        setUpdateOpen(false);
        setQueryForm((old) => {
            return { ...old };
        });
    }

    function onUpdateClick(student: Student) {
        setUpdateOpen(true);
        setUpdateFormFill(student);
    }

    function onUpdateCancel() {
        setUpdateOpen(false);
    }

    function onInsertSuccess() {
        setInsertOpen(false);
        setQueryForm((old) => {
            return { ...old };
        });
    }

    function onInsertClick() {
        setInsertOpen(true);
    }

    function onInsertCancel() {
        setInsertOpen(false);
    }

    const columns: ColumnsType<Student> = [
        {
            title: "编号",
            dataIndex: "id",
        },
        {
            title: "姓名",
            dataIndex: "name",
        },
        {
            title: "性别",
            dataIndex: "gender",
        },
        {
            title: "年龄",
            dataIndex: "age",
        },
        {
            title: "操作",
            dataIndex: "operation",
            render: (_, student) => {
                return (
                    <>
                        <Space>
                            <A6Delete id={student.id} onSuccess={onDeleteSuccess}></A6Delete>

                            <Button
                                size="small"
                                type="primary"
                                onClick={() => {
                                    onUpdateClick(student);
                                }}
                            >
                                修改
                            </Button>
                        </Space>
                    </>
                );
            },
        },
    ];

    // update
    const [updateOpen, setUpdateOpen] = useState(false);
    const [updateFormFill, setUpdateFormFill] = useState({
        id: 0,
        name: "",
        age: 19,
        gender: "女",
    });

    // insert
    const [insertOpen, setInsertOpen] = useState(false);
    const [insertFormFill, setInsertFormFill] = useState({
        id: 0,
        name: "",
        age: 19,
        gender: "女",
    });

    const [ids, setIds] = useState<React.Key[]>([])
    function onIdsChange(ids:React.Key[]){
        console.log(ids)
        setIds(ids)
    }
    function onDeletedSelectedSuccess(){
        setQueryForm((old)=>{
            return {...old}
        })
        setIds([])
    }

    return (
        <div>
            <A6Insert
                open={insertOpen}
                student={insertFormFill}
                onSuccess={onInsertSuccess}
                onCancel={onInsertCancel}
            ></A6Insert>
            <A6Update
                open={updateOpen}
                student={updateFormFill}
                onSuccess={onUpdateSuccess}
                onCancel={onUpdateCancel}
            ></A6Update>
            <div>
                <Input
                    style={{ width: 140 }}
                    placeholder="请输入姓名"
                    onChange={onNameChange}
                ></Input>
                <Select
                    style={{ width: 140 }}
                    placeholder="请选择性别"
                    allowClear={true}
                    onChange={onGenderChange}
                >
                    <Select.Option value="男">男</Select.Option>
                    <Select.Option value="女">女</Select.Option>
                </Select>
                <Select
                    style={{ width: 140 }}
                    placeholder="请选择年龄"
                    allowClear={true}
                    onChange={onAgeChange}
                >
                    <Select.Option value="1,19">20以下</Select.Option>
                    <Select.Option value="20,29">20左右</Select.Option>
                    <Select.Option value="30,39">30左右</Select.Option>
                    <Select.Option value="40,120">40以上</Select.Option>
                </Select>
                <Button type="primary" onClick={onInsertClick}>
                    新增
                </Button>
                <A6DeleteSelected ids={ids} onSuccess={onDeletedSelectedSuccess}></A6DeleteSelected>
            </div>

            <Table
                columns={columns}
                dataSource={students}
                rowKey="id"
                loading={loading}
                pagination={pagination}
                onChange={onTableChange}
                rowSelection={
                    {
                        selectedRowKeys: ids,
                        onChange: onIdsChange
                    }
                }
            ></Table>
        </div>
    );
}
