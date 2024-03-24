export interface Region {
    id: string,
    title: string
}

export interface AnonymousResult{
    party: string,
    candidate: string,
    votes: number,
    elected: boolean
}

export interface Result extends AnonymousResult {
    id: string
}

export interface Party {
    id: string,
    displayId?: string,
    title: string,
    color?: string,
    textColor?: string
}