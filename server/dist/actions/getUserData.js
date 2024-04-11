"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getUserData(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.waitForSelector(".content");
        const userFetchMethods = {
            // yourPersonalAccountInfo
            username: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tbody tr:nth-child(2) td:nth-child(2)");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => el.textContent));
            }),
            subscriptionType: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tbody tr:nth-child(3) td:nth-child(2)");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => el.textContent));
            }),
            subscriptionState: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tbody tr:nth-child(4) td:nth-child(2) strong");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => el.textContent));
            }),
            yourDeviceMacAddress: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tbody tr:nth-child(6) td:nth-child(2)");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => el.textContent));
            }),
            account: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tbody tr:nth-child(7) td:nth-child(2)");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => `${parseInt(el.textContent).toFixed(2)} L.E`));
            }),
            // serviceData
            currentService: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tr:nth-child(2) tbody tr:nth-child(2) strong");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => el.textContent));
            }),
            // personalData
            firstName: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tr:nth-child(3) tbody tr:nth-child(2) strong");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => el.textContent));
            }),
            familyName: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tr:nth-child(3) tbody tr:nth-child(3) strong");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => el.textContent));
            }),
            address: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tr:nth-child(3) tbody tr:nth-child(4) strong");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => el.textContent));
            }),
            phoneNumber: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tr:nth-child(3) tbody tr:nth-child(10) strong");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => el.textContent));
            }),
            email: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tr:nth-child(3) tbody tr:nth-child(11) strong");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => el.textContent));
            }),
            // yourQuota
            totalDownloadAvailableToYou: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tr:nth-child(4) tbody tr:nth-child(4) strong");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => el.textContent));
            }),
            subscriptionExpDate: () => __awaiter(this, void 0, void 0, function* () {
                const query = yield page.$(".content > table table tbody table tbody tr:nth-child(4) tbody tr:nth-child(6) strong");
                return yield (query === null || query === void 0 ? void 0 : query.evaluate((el) => el.textContent));
            }),
        };
        const userState = {
            yourPersonalAccountInfo: {
                username: yield userFetchMethods.username(),
                subscriptionState: yield userFetchMethods.subscriptionState(),
                subscriptionType: yield userFetchMethods.subscriptionType(),
                yourDeviceMacAddress: yield userFetchMethods.yourDeviceMacAddress(),
                account: yield userFetchMethods.account(),
            },
            serviceData: {
                currentService: yield userFetchMethods.currentService(),
            },
            personalData: {
                firstName: yield userFetchMethods.firstName(),
                familyName: yield userFetchMethods.familyName(),
                address: yield userFetchMethods.address(),
                phoneNumber: yield userFetchMethods.phoneNumber(),
                email: yield userFetchMethods.email(),
            },
            yourQuota: {
                totalDownloadAvailableToYou: yield userFetchMethods.totalDownloadAvailableToYou(),
                subscriptionExpDate: yield userFetchMethods.subscriptionExpDate(),
            },
        };
        return userState;
    });
}
exports.default = getUserData;
