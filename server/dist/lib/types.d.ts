interface AccountInfo {
    username: string;
    subscriptionState: string;
    subscriptionType: string;
    yourDeviceMacAddress: string;
    account: string;
}
interface ServiceData {
    currentService: string;
}
interface PersonalData {
    firstName: string;
    familyName: string;
    address: string;
    phoneNumber: string;
    email: string;
}
interface Quota {
    totalDownloadAvailableToYou: string;
    subscriptionExpDate: string;
}
export interface IUserData {
    yourPersonalAccountInfo: AccountInfo;
    serviceData: ServiceData;
    personalData: PersonalData;
    yourQuota: Quota;
}
export {};
