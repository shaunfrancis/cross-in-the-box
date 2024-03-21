export interface Region {
    id: string,
    title: string
}

export interface Result {
    id: string,
    party: string,
    candidate: string,
    votes: number,
    elected: boolean
}

export interface Party {
    id: string,
    title: string,
    color?: string
}