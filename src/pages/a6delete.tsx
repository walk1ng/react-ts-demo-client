import { Button, Popconfirm, message } from "antd";
import axios from "axios";
import { R } from "../models/r";

export default function A6Delete({ id, onSuccess }: { id: number , onSuccess: ()=>void}) {

    async function onConfirm() {
        const resp = await axios.delete<R<string>>(`${process.env.API_URL}/api/student/${id}`)
        console.log(resp.data.data)
        message.success(resp.data.data)

        onSuccess()
    }


    return <Popconfirm title='是否确认删除' onConfirm={onConfirm}>
        <Button danger size='small'>删除</Button>
    </Popconfirm>
}
