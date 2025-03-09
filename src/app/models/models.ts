export interface Airline {
  id: number;
  name: string;
  country: string;
  status: 'active' | 'inactive';
}

export interface Flight {
  id: number;
  airlineId: number;
  departure: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  availableSeats: number;
}

export interface Booking {
  id: number;
  userId: number;
  flightId: number;
  status: 'pending' | 'confirmed' | 'canceled';
  paymentStatus: 'paid' | 'unpaid';
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
}

export interface Passenger {
  id: number;
  bookingId: number;
  name: string;
  passportNumber: string;
}
