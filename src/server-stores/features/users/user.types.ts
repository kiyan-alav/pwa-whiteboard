export interface CreateNewUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isOnline: boolean;
  profileColor: string;
}

export interface SendMessagePayload {
  userId: string;
  message: string;
}

export interface Message {
  _id: string;
  sender: { _id: string; firstName: string; lastName: string; email: string, profileColor: string };
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
