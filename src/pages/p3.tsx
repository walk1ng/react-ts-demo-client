import axios from "axios"
import { Student } from "../models/student"
import { R } from "../models/r"




export default function P4({ id }: { id: number }) {

    async function updateStudent() {

        const resp = await axios.get<R<Student>>(`${process.env.API_URL}/api/students/${id}`)
        console.log(resp.data.data)
    }

    updateStudent()

    return null

}