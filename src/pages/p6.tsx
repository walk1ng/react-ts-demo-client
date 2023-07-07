import axios from "axios"
import { useEffect, useState } from "react"
import { Student } from "../models/student"
import { R } from "../models/r"

// export default function P6({ id, age }: { id: number, age: number }) {
//     console.log("主要功能")

//     useEffect(()=>{
//         console.log("副作用功能")
//     }, [id])

//     console.log('渲染')
//     return <h2>{id}</h2>
// }

export default function P6({ id, age }: { id: number, age: number }) {
    console.log("主要功能")



    const [student, setStudent] = useState({ name: 'xx' })

    useEffect(() => {
        console.log("副作用功能")

        async function updateStudent() {
            const resp = await axios.get<R<Student>>(`${process.env.API_URL}/api/students/${id}`)
            console.log(resp.data.data)
            setStudent(resp.data.data)
        }

        updateStudent()
    }, [id])

    console.log('渲染')
    return <h2>{student.name}</h2>
}