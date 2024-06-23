export interface User{
    id:number;
    userName: string;
    password: string;
    creationDate: string;
    userStatus?: boolean;
    userAddress?: string;
    userEmail?: string;
    userPhone?: string;
    city?: string;
    state?: string;
}