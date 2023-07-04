import { Button, Modal } from "antd";

export default function A1() {
    return (
        <>
            <Button type="primary">primary button</Button>
            <br />
            <Button type="link">link button</Button>
            <br />
            <Button type="text">text button</Button>
            <Modal title='标题' open={true}>内容</Modal>
        </>
    )
}