import { Form, Input, InputNumber, Modal, Radio, message } from "antd";
import { useEffect } from "react";
import { Student } from "../models/student";
import axios from "axios";
import { R } from "../models/r";
import { Rule } from "antd/es/form";

export default function A6Update({
    open,
    student,
    onSuccess,
    onCancel
}: {
    open: boolean;
    student: Student;
    onSuccess?: () => void;
    onCancel?: () => void;
}) {
    const options = [
        { label: "男", value: "男" },
        { label: "女", value: "女" },
    ];

    const [form] = Form.useForm();

    async function onOk() {
        try {
            const values = await form.validateFields();
            console.log(values);
            const resp = await axios.put<R<string>>(
                `http://192.168.80.163:8080/api/student/${values.id}`,
                values
            );
            message.success(resp.data.data);
            onSuccess && onSuccess()
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        form.setFieldsValue(student);
    }, [student]);

    const nameRules: Rule[] = [
        { required: true, message: '姓名必填' },
        { min: 2, type: 'string', message: '大于两个字符' }
    ]

    const ageRules: Rule[] = [
        { required: true, message: '年龄必填' },
        { min: 1, type: 'number', message: '最小1岁' },
        { max: 120, type: 'number', message: '最大120岁' }
    ]

    return (
        <Modal title="修改学生" open={open} onOk={onOk} onCancel={onCancel}>
            <Form form={form}>
                <Form.Item label="编号" name="id">
                    <Input readOnly={true}></Input>
                </Form.Item>
                <Form.Item label="姓名" name="name" rules={nameRules}>
                    <Input></Input>
                </Form.Item>
                <Form.Item label="性别" name="gender">
                    <Radio.Group
                        options={options}
                        optionType="button"
                        buttonStyle="solid"
                    ></Radio.Group>
                </Form.Item>
                <Form.Item label="年龄" name="age" rules={ageRules}>
                    <InputNumber></InputNumber>
                </Form.Item>
            </Form>
        </Modal>
    );
}
