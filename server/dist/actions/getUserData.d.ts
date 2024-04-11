import { Page } from "puppeteer";
export default function getUserData(page: Page): Promise<{
    yourPersonalAccountInfo: {
        username: string | null | undefined;
        subscriptionState: string | null | undefined;
        subscriptionType: string | null | undefined;
        yourDeviceMacAddress: string | null | undefined;
        account: string | undefined;
    };
    serviceData: {
        currentService: string | null | undefined;
    };
    personalData: {
        firstName: string | null | undefined;
        familyName: string | null | undefined;
        address: string | null | undefined;
        phoneNumber: string | null | undefined;
        email: string | null | undefined;
    };
    yourQuota: {
        totalDownloadAvailableToYou: string | null | undefined;
        subscriptionExpDate: string | null | undefined;
    };
}>;
