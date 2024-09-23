export type Guitar={
    id:number,
    name:string,
    description:string,
    image:string,
    price:number
}

export type GuitarItem = Guitar & {
    quantity:number
}

export type GuitarId = Guitar['id']