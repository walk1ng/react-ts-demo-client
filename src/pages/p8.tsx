import axios from "axios"
import React, { useState } from "react"
import { R } from "../models/r"
import { Student } from "../models/student"
import Qs from 'qs'

export default function P8() {

    const [student, setStudent] = useState({ name: '', age: 18, gender: '男' })
    const [message, setMessage] = useState('')

    const options = ['男', '女']
    const jsx = options.map(o => <option key={o}>{o}</option>)
    const messageJsx = message && <div>{message}</div>

    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setStudent((old) => {
            console.log(old)
            const n = { ...old, [e.target.name]: e.target.value }
            console.log(n)
            return n
        })
    }

    async function onClick() {
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        console.log('js', student)
        console.log('string',Qs.stringify(student))
        const resp = await axios.post<R<Student>>(`http://192.168.80.163:8080/api/students`, Qs.stringify(student))
        console.log(resp.data.data)
        setMessage(resp.data.message ? resp.data.message : '')

    }

    return (
        <form>
            <div>
                <label>姓名</label>
                <input type="text" name="name" id="" value={student.name} onChange={onChange} />
            </div>
            <div>
                <label>性别</label>
                <select name="gender" id="" value={student.gender} onChange={onChange}>
                    {jsx}
                </select>
            </div>

            <div>
                <label>年龄</label>
                <input type="text" name="age" id="" value={student.age} onChange={onChange} />
            </div>
            <div>
                <input type="button" value="新增" onClick={onClick} />
            </div>
            {messageJsx}
        </form>
    )
}