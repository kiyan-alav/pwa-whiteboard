export interface SendMessagePayload {
  userId: string;
  message: string;
}

export interface Message {
  _id: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileColor: string;
  };
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
