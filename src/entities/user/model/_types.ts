interface User {
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    phone: string;
}

interface UserState {
    user?: User;
    setUser: (user: User) => void;
    clearUser: () => void;
}

export type { User, UserState };
