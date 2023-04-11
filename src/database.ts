import { User, Product, Purchase } from "./types";

export const users: User[] = [
    {
        id:"001",
        email:"arthur@email.com",
        password:"1234"
    }, 
    {
        id:"002",
        email:"765carol@email.com",
        password:"1234567890"
    },
    {
        id:"003",
        email:"456carol@email.com",
        password:"1234567890"
    }, 
    {
        id:"004",
        email:"123carol@email.com",
        password:"1234567890"
    }
];

export const products: Product[] = [
    {
        id:"001",
        name: "maçã",
        price: 10,
        category: "fruta"
    },
    {
        id:"002",
        name: "banana",
        price: 5,
        category: "fruta"
    }
]

export const purchase: Purchase[] = [
    {
        userId: users[0].id,
        productId: products[0].id,
        quantity: 2,
        totalPrice: products[0].price
    },
    {
        userId: users[1].id,
        productId: products[1].id,
        quantity: 6,
        totalPrice: products[1].price
    }
]


