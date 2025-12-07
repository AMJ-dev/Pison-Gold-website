export interface TokenRemember {
    token: string;
    remember: boolean;
}

export interface User {
    id: string;
    full_name: string;
    email: string;
}

export interface AuthContextValue {
	auth: boolean;
	token: string | null;
	my_id: string | null;
	my_details: User | null;
	hydrated: boolean;
	detailsReady: boolean;
	setAuth: (next: boolean) => void;
	setToken: (next: string | null) => void;
	setMyID: (next: string | null) => void;
	setMyDetails: (next: User | null) => void;
	setHydrated: (next: boolean) => void;
	setDetailsReady: (next: boolean) => void;
	login: (tokenRemember: { token: string; remember: boolean }) => Promise<void>;
	logout: () => void;
}

export interface ApiResp {
    code: any,
    data: any;
    error: boolean;
    token: string;
}

export interface Team {
  id: number;
  full_name: string;
  position: string;
  company?: string;
  image: string | null;
  facebook: string | null;
  linkedin: string | null;
  twitter: string | null;
  email?: string;
  phone?: string;
  joined_date?: string;
}