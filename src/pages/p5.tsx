import axios from "axios"
import { Student } from "../models/student"
import { R } from "../models/r"
import { useState } from "react"




export default function P5({ id }: { id: number }) {

    async function updateStudent() {

        const resp = await axios.get<R<Student>>(`${process.env.API_URL}/api/students/${id}`)
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