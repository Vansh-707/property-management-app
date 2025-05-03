export interface Property {
    id: number;
    name: string;
    address: string;
    created_at: Date;
    floors?: Floor[];
}

export interface Floor {
    id: number;
    property_id: number;
    floor_number: number;
    created_at: Date;
    units?: Unit[];
}

export interface Unit {
    id: number;
    floor_id: number;
    unit_number: string;
    status: 'available' | 'booked';
    created_at: Date;
    floor_number?: number;
    property_name?: string;
}

export interface AuthResponse {
    token: string;
}

export interface BookingHistory {
    id: number;
    unit_id: number;
    user_id: string;
    booked_at: Date;
}