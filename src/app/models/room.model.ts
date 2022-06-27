import { Friend } from "./friend.model";

export interface Room {
    id?: any,
    name: string,
    admin: string,
    description: string,
    tags: string[],
    participants: Friend[]
}