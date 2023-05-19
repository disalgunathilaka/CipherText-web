export interface IMessage {
  text: string;
  isRead: boolean;
  date: string;
  profile: {
    photo: string;
    fullName: string;
  };
}
