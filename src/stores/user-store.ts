import { BehaviorSubject } from "rxjs"

export interface User {
    fullName: string
    email: string
    role: "user" | "admin"
}

const userSubject = new BehaviorSubject<User | null>(null)

export const userStore = {
    user$: userSubject.asObservable(),
    getUser: () => userSubject.getValue(),
    setUser: (user: User) => {
        console.log("SET USER =>", user)
        userSubject.next(user)
    },
    clear: () => userSubject.next(null)
}