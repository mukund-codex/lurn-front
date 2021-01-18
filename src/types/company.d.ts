interface Company {
    id: string;
    name: string;
    email: string;
    logo: string;
    username: string;
    settings?: {
        color: string,
        pagination: string,
        sender_id: string,
    }
    is_active: boolean
}