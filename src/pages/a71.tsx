import { Input } from "antd";
import StudentStore from '../store/student_store'
import { observer } from "mobx-react-lite";

function A71() {
    return <>
        <h3>组件1 {StudentStore.student.name}</h3>
    </>
}

export default observer(A71)