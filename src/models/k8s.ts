export interface Pod {
    name: string
    namespace: string
    uid: string
    node: string
    phase: string
}

export interface Namespace {
    name: string
    uid: string
}