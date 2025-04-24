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
  id_flight: number;
  numeroVol: string;
  prix: string;
  statut: 'Actif' | 'Inactif';
  id_destination: number;
  id_dt: number;
  Date: {
    date: string;
    heureDepart: string;
    heureArrivee: string;
  };
  Destination: {
    villeDepart: string;
    villeDestination: string;
  };
}

export interface models{
  flight: Flight;
}

export interface BookingWithDetails {
status: any;
Destination: any;
  id_res: number;
  numReservation: string;
  statut: 'En attente' | 'Confirmée' | 'Annulée';
  id_user: number;
  id_flight: number;
  id_dt: number;
  id_cl: number;

  User: {
    id_user: number;
    nom: string;
  };

  Flight: {
    numeroVol: string;
    Date: {
      date: string;
      heureDepart: string;
      heureArrivee: string;
    };
    Destination: {
      villeDepart: string;
      villeDestination: string;
    };
  };
}
export interface models{
  booking: BookingWithDetails;
}
export interface User {
  id_user: number;
  nom: string;
  prenom: string;
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
