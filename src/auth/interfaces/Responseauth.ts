import type { User } from "@/interfaces/UserResponse";

//funciona para login, rwegister,chekstatus

export interface ResponseAuth {
    user:  User;
    token: string;
}


