import { Button, Popconfirm, message } from "antd";
import axios from "axios";
import { R } from "../models/r";

export default function A6DeleteSelected({ ids, onSuccess }: { ids: React.Key[], onSuccess:()=>void }) {
  let disabled = false
  if (ids.length === 0) {
    disabled = true
  }
  async function onConfirm() {
    const resp = await axios.delete<R<string>>(
      `${process.env.API_URL}/api/students`,
      {
        data: {
          ids: ids,
        },
      }
    );
    message.success(resp.data.data);
    onSuccess && onSuccess()
  }

  return (
    <Popconfirm title="确认是否删除所学" onConfirm={onConfirm} disabled={disabled}>
      <Button danger type="primary" disabled={disabled}>
        删除所选
      </Button>
    </Popconfirm>
  );
}
