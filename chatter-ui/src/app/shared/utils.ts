export interface SignupRequest {
  username: string;
  displayName: string;
  password: string;
  rePassword: string
}

export interface LoginRequest {
  username: string;
  password: string;
}

