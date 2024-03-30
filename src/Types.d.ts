export interface Region {
    id: string,
    title: string
}

export interface AnonymousResult{
    party: string,
    votes: number,
    candidate?: string,
    elected?: boolean
}

export interface Result extends AnonymousResult {
    id: string
    candidate: string,
    elected: boolean
}

export interface Party {
    id: string,
    displayId?: string,
    title: string,
    color?: string,
    textColor?: string
}

export interface MessageData {
    date : Date,
    text : string,
    results? : AnonymousResult[]
}