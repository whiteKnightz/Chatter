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


export interface Chat {
  chat: {
    chat_id: string,
    sender: string
    receiver: string
  },
  gcs: Correspondence[]
}

export interface Correspondence{
  correspondence_id: string,
  created_date: string,
  sender: string,
  message: string,
  chat: string
}
