export interface Airline {
  id: number;
  name: string;
  country: string;
  status: 'active' | 'inactive';
}
export interface models {
  airline: Airline;
}


export interface Flight {
  id: string;
  departure: string;
  destination: string;
  departureDate: Date;
  arrivalDate: Date;
  Passenger:number;
  price: number;
  seats: number;
  class: 'economy' | 'business' | 'first';
  stops: number;
}
export interface models{
  flight: Flight;
}

export interface Booking {
  id: number;
  userId: number;
  flightId: number;
  status: 'pending' | 'confirmed' | 'canceled';
  paymentStatus: 'paid' | 'unpaid';
}

export interface models{
  booking: Booking;
}
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
}

export interface models{
  user: User;
}
export interface Passenger {
  id: number;
  bookingId: number;
  name: string;
  passportNumber: string;
}

export interface models{
  passenger: Passenger;
}
