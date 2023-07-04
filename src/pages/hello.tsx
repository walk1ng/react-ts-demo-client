// export default function Hello(props: {
//     msg: string,
//     age?: number
// }) {
//     return <h1>hello {props.msg}! 年龄{props.age}</h1>
// }

export default function Hello( {msg, age = 90}: {
    msg: string,
    age?: number
}) {
    return <h1>hello {msg}! 年龄{age}</h1>
}