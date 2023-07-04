import axios from "axios"
import { Student } from "../models/student"
import { R } from "../models/r"
import { useState } from "react"




export default function P5({ id }: { id: number }) {

    async function updateStudent() {

        const resp = await axios.get<R<Student>>(`http://192.168.80.163:8080/api/students/${id}`)
        setStudent(resp.data.data)
        console.log(student)
    }

    const [student, setStudent] = useState({ name: 'xx' })
    const [fetch, setFetch] = useState<boolean>(false)


    if (!fetch) {
        setFetch(true)
        updateStudent()
    }


    console.log(student)
    return <h3>{student.name}</h3>

}