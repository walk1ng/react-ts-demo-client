import { Student } from '../models/student'
import '../css/myapp.css'

export default function P1({ student, hidenAge = false }: {
    student: Student,
    hidenAge?: boolean
}) {

    function handleClick(e: React.MouseEvent) {
        console.log(student)
        console.log(e)
    }

    const ageFragment = !hidenAge && <span>年龄 {student.age}</span>

    return (
        <div className='student'>
            <img src={student.avatar} alt={student.name} onClick={handleClick} />
            <h1>{student.name}</h1>
            <h2>{student.id}</h2>
            <p>性别 {student.gender} {ageFragment}</p>
        </div>
    )
}