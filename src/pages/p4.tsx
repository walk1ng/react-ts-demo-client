import axios from "axios"
import { Student } from "../models/student"
import { R } from "../models/r"




export default function P3({ id }: { id: number }) {

    async function updateStudent() {

        const resp = await axios.get<R<Student>>(`${process.env.API_URL}/api/students/${id}`)
        console.log(resp.data.data)
        student.name = resp.data.data.name 
        console.log(student)
    }

    updateStudent()

    const student = {name:"xx"}
    console.log(student)

    return <h3>{student.name}</h3>

}