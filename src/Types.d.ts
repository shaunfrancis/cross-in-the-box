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
    square? : string,
    old_square? : string,
    no_header? : boolean,
    text : string,
    results? : AnonymousResult[],
    result_type?: number,
    link_title?: string
}

export interface PollSkeleton {
    id: number,
    pollster: string,
    start: Date,
    end: Date,
    client?: string,
    source?: string,
    sample?: number
}

export interface PollFigure {
    poll_id?: number,
    party: string,
    figure: number
}

export interface Poll extends PollSkeleton {
    centre: number,
    figures: PollFigure[]
}