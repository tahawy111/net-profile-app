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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const puppeteer_1 = __importDefault(require("puppeteer"));
const cors_1 = __importDefault(require("cors"));
const getUserData_1 = __importDefault(require("./actions/getUserData"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: "GET,POST,DELETE,PUT,PATCH"
}));
app.use(express_1.default.json());
function loginToSite(page, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.goto("http://100.100.1.80/user.php");
        yield page.type("#username", username);
        yield page.type("#password", password);
        yield page.click("#submit");
        yield new Promise((resolve) => setTimeout(resolve, 1000));
        const checkQueryAfterReloadHandle = yield page.$("tbody tr:nth-child(2) td p:nth-child(3) font");
        if (checkQueryAfterReloadHandle) {
            return { error: "اسم المستخدم غير صحيح أو كلمة المرور!" };
        }
        // Assuming getUserData is defined somewhere else
        const userData = yield (0, getUserData_1.default)(page);
        return userData;
    });
}
app.post("/login", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const browser = yield puppeteer_1.default.launch({ headless: true });
            const page = yield browser.newPage();
            const result = yield loginToSite(page, req.body.username, req.body.password);
            yield browser.close();
            if (result.error) {
                return res.status(401).json({ msg: result.error });
            }
            else {
                res.json(result);
            }
        }
        catch (error) {
            console.error("Error occurred during login:", error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
});
app.get("/getUserData/:username/:password", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const browser = yield puppeteer_1.default.launch({ headless: true });
            const page = yield browser.newPage();
            const result = yield loginToSite(page, req.params.username, req.params.password);
            yield browser.close();
            if (result.error) {
                return res.status(401).json({ msg: result.error });
            }
            else {
                res.json(result);
            }
        }
        catch (error) {
            console.error("Error occurred while fetching user data:", error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
});
app.post("/renew", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const browser = yield puppeteer_1.default.launch({ headless: true });
            const page = yield browser.newPage();
            const result = (yield loginToSite(page, req.body.username, req.body.password));
            const currentService = result.serviceData.currentService;
            yield page.goto("http://100.100.1.80/user.php?cont=change_service");
            yield page.waitForSelector("#newsrvid");
            yield page.select("#newsrvid", "118");
            // click on button. it doesn't work in normal way await page.click(`input[type="submit"][value="التالي>"]`);
            yield page.evaluate(() => {
                // Find the input button element by its value
                const button = document.querySelector(`input[type="submit"][value="التالي>"]`);
                // If the button element is found, simulate a click event on it
                if (button) {
                    button.click();
                }
                else {
                    console.error("Button with specified value not found");
                }
            });
            yield page.waitForNavigation();
            yield page.evaluate(() => {
                // Find the input button element by its value
                const button = document.querySelector(`input[type="submit"][value="تأكيد وأنهاء"]`);
                // If the button element is found, simulate a click event on it
                if (button) {
                    button.click();
                }
                else {
                    console.error("Button with specified value not found");
                }
            });
            yield page.waitForNavigation();
            yield page.goto("http://100.100.1.80/user.php?cont=change_service");
            yield page.waitForSelector("#newsrvid");
            const options = yield page.evaluate(() => {
                const allOptions = document.querySelectorAll("#newsrvid > option");
                return Object.values(allOptions).map((option) => ({
                    text: option.textContent,
                    value: option.value,
                }));
            });
            const optionValue = (_a = options.find((option) => option.text === currentService)) === null || _a === void 0 ? void 0 : _a.value;
            yield page.select("#newsrvid", optionValue);
            yield page.evaluate(() => {
                // Find the input button element by its value
                const button = document.querySelector(`input[type="submit"][value="التالي>"]`);
                // If the button element is found, simulate a click event on it
                if (button) {
                    button.click();
                }
                else {
                    console.error("Button with specified value not found");
                }
            });
            yield page.waitForNavigation();
            yield page.evaluate(() => {
                // Find the input button element by its value
                const button = document.querySelector(`input[type="submit"][value="تأكيد وأنهاء"]`);
                // If the button element is found, simulate a click event on it
                if (button) {
                    button.click();
                }
                else {
                    console.error("Button with specified value not found");
                }
            });
            yield page.waitForNavigation();
            // await browser.close();
            if (result.error) {
                return res.status(401).json({ msg: result.error });
            }
            res.json({ msg: "تم تجديد الباقة بنجاح.انتظر دقيقة وسيعمل الانترنت" });
        }
        catch (error) {
            console.error("Error occurred during renew:", error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
});
const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
