export interface Currency{
    id: number;
    username: string;
    currency: string;
    currencySymbol?: string;
    quantity?: number;
    bookingDate: string;
    rate: number;
    expiryDate?: Date; 
    status?: boolean;
}