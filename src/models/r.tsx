export interface R<T> {
    code: number,
    data: T,
    message?: string
}

export interface PageR<T> {
    total: number,
    list: T
}

export interface QueryForm {
    name?: string,
    gender?: string,
    age?: string
}