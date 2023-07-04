import { Input } from "antd";
import StudentStore from '../store/student_store'
import { observer } from "mobx-react-lite";
import A71 from "./a71";
import A72 from "./a72";
import Search from "antd/es/input/Search";

function A7() {
    function onChange(e:React.ChangeEvent<HTMLInputElement>) {
        StudentStore.setName(e.target.value)
    }
    
    function onSearch(v:string) {
        StudentStore.fetch(Number(v))
    }
    return <>
        <Input onChange={onChange} placeholder="请输入姓名" style={{width: 150}}></Input>
        <Search placeholder="请输入编号" style={{width: 150}} onSearch={onSearch}></Search>
        <h3>组件0 {StudentStore.displayName}</h3>
        <A71></A71>
        <A72></A72>
    </>
}

export default observer(A7)