import { action, computed, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { Student } from "../models/student";
import axios from "axios";
import { R } from "../models/r";

class StudentStore {
  // 属性 Observable state
  // @observable student: Student = { id: 0, name: "", age: 18, gender:'女'};
  student: Student = { id: 0, name: "", age: 18, gender:'女'};
  // 方法 actions
  // @action setName(name: string) {
  setName(name: string) {
    this.student.name = name;
  }

  // @action async fetch(id:number) {
  async fetch(id:number) {
    const resp = await axios.get<R<Student>>(`${process.env.API_URL}/api/students/${id}`)
    // this.setName(resp.data.data.name)
    runInAction(()=>{
      this.student = resp.data.data
    })
  }

  // @computed get displayName() {
  get displayName() {
    const first = this.student.name.charAt(0)
    if (this.student.gender === '男') {
      return first + '大侠'
    } else if (this.student.gender === '女') {
      return first + '女侠'
    } else {
      return ''
    }
  }

  constructor() {
    // makeObservable(this)
    makeAutoObservable(this);
  }
}

export default new StudentStore()