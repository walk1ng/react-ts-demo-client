import React from "react"
import P1 from "./p1"
import { Student } from "../models/student"

// export default function P2() {
//     const arr = [1,2,3]
//     const jsx = arr.map(e=><p key={e}>{e}</p>)
//     return <React.Fragment>{jsx}</React.Fragment>
// }

export default function P2({ students, hidenAge = false }: {
    students: Student[],
    hidenAge?: boolean
}) {
    const jsx = students.map(s => <P1 key={s.id} student={s} hidenAge={hidenAge}></P1>)
    return <React.Fragment>{jsx}</React.Fragment>
}