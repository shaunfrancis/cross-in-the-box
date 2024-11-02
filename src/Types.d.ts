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
    id: string,
    subid?: number,
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
    id: number,
    date : Date,
    text : string,

    square? : string,
    old_square? : string,

    pinned? : number,
    no_header? : boolean,

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

export interface SearchResults{
    regions : {id : string, title : string, current : boolean}[], 
    candidates : {
        id : string,
        title : string,
        candidate : string,
        election : string[],
        party : Party
    }[]
}

export interface FullRegionData{
    events : Event[],
    parties : Party[],
    tree : {
        region_id: string,
        successor_id: string,
        direct_successor: boolean,
        title: string,
        note?: string
    }[]
}

interface Event{
    type : string,
    date : Date,
    region : Region
}

export interface ElectionEvent extends Event{
    data : { 
        id : string,
        title : string[],
        results : Result[] 
    }
}

export interface UpdateEvent extends Event{
    data: {
        party: string,
        note: string
    }
}

export interface Update{
    id : string,
    date : Date,
    party : string
}