import { Image } from "./image"


export interface Service {
    name: string
    price: number
    currency: string
    details: string
    gallery: Image[]
    category: string

}