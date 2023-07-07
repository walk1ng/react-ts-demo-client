import { createContext, useContext, useEffect, useState } from "react";
import { Student } from "../models/student";
import axios from "axios";
import { R } from "../models/r";

const HiddenContext = createContext(false)

export default function P7() {
    const [students, setStudents] = useState<Student[]>([])
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        async function updateStudents() {
            const resp = await axios.get<R<Student[]>>(`${process.env.API_URL}/api/students`)
            console.log(resp.data.data)
            setStudents(resp.data.data)
        }
        updateStudents()
    }, [])

    function hideOrShow(){
        setHidden((old)=>{
            return !old
        })
    }

    return <HiddenContext.Provider value={hidden}>
        <input type="button" value={hidden?"显示":"隐藏"} onClick={hideOrShow}/>
        <P71 students={students}></P71>
    </HiddenContext.Provider>



}

function P71({ students }: { students: Student[] }) {
    const list = students.map(s => <P72 student={s} key={s.id}></P72>)
    return <>{list}</>
}

function P72({ student }: { student: Student }) {
    const hiddenAge = useContext(HiddenContext)
    const ageFragment = !hiddenAge && <span>{student.age}</span>
    return <div>{student.name} {ageFragment}</div>
}