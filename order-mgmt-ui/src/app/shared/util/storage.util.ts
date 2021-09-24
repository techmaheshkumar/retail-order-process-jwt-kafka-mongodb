import { User } from '../model/user';

const clientIdValue: string = "clientId";
const userIdValue: string = "id";
const addressIdValue: string = "address";
export function getClientId(): number {
    let clientId = localStorage.getItem(clientIdValue);
    return clientId ? parseInt(clientId) : 0;
}
export function getUserId(): number {
    let clientId = localStorage.getItem(userIdValue);
    return clientId ? parseInt(clientId) : 0;
}
export function getAddress(): string {
    let clientId = localStorage.getItem(addressIdValue);
    return clientId ? clientId : '';
}
export function getCity(): string {
    let clientId = localStorage.getItem('city');
    return clientId ? clientId : '';
}
export function getPin(): string {
    let clientId = localStorage.getItem('pincode');
    return clientId ?clientId: '';
}
export function isLoggedInUser(): boolean{
    let clientId = localStorage.getItem('token');
    return clientId?true:false;
}

export function getUser():any{
    let user = localStorage.getItem('user');
    return user;
}

