import * as signalR from '@microsoft/signalr';

export const signalRConnection = () => {
  return new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7071/registrationHub')
    .withAutomaticReconnect()
    .build();
};
