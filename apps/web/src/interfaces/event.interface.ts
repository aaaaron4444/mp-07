export interface IEvent {
    organizerId: number;
    eventName: string;
    eventDescription: string;
    startDate: Date;
    endDate: Date;
    ticketType: string;
    originalPrice: number;
    location: number;
    category: number;
    totalSeats: number;
    earlybird_promo: boolean;
}