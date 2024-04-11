import express from "express";

import "dotenv/config";
import fs from "node:fs";
import puppeteer, { Page } from "puppeteer";
import cors from "cors";
import getUserData from "./actions/getUserData";
import { IUserData } from "./lib/types";

const app = express();

app.use(cors({
  origin: "*",
  methods: "GET,POST,DELETE,PUT,PATCH"
}));
app.use(express.json());

async function loginToSite(page: Page, username: string, password: string) {
  await page.goto("http://100.100.1.80/user.php");
  await page.type("#username", username);
  await page.type("#password", password);
  await page.click("#submit");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const checkQueryAfterReloadHandle = await page.$(
    "tbody tr:nth-child(2) td p:nth-child(3) font"
  );
  if (checkQueryAfterReloadHandle) {
    return { error: "اسم المستخدم غير صحيح أو كلمة المرور!" };
  }

  // Assuming getUserData is defined somewhere else
  const userData = await getUserData(page);
  return userData;
}

app.post("/login", async function (req, res) {
  try {
    console.log(req.body);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const result = await loginToSite(
      page,
      req.body.username,
      req.body.password
    );

    await browser.close();

    if ((result as any).error) {
      return res.status(401).json({ msg: (result as any).error });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
app.get("/getUserData/:username/:password", async function (req, res) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const result = await loginToSite(
      page,
      req.params.username,
      req.params.password
    );

    await browser.close();

    if ((result as any).error) {
      return res.status(401).json({ msg: (result as any).error });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error("Error occurred while fetching user data:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
app.post("/renew", async function (req, res) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const result = (await loginToSite(
      page,
      req.body.username,
      req.body.password
    )) as IUserData;

    const currentService = result.serviceData.currentService;

    await page.goto("http://100.100.1.80/user.php?cont=change_service");
    await page.waitForSelector("#newsrvid");
    await page.select("#newsrvid", "118");
    // click on button. it doesn't work in normal way await page.click(`input[type="submit"][value="التالي>"]`);
    await page.evaluate(() => {
      // Find the input button element by its value
      const button = document.querySelector(
        `input[type="submit"][value="التالي>"]`
      ) as HTMLInputElement;
      // If the button element is found, simulate a click event on it
      if (button) {
        button.click();
      } else {
        console.error("Button with specified value not found");
      }
    });
    await page.waitForNavigation();
    await page.evaluate(() => {
      // Find the input button element by its value
      const button = document.querySelector(
        `input[type="submit"][value="تأكيد وأنهاء"]`
      ) as HTMLInputElement;
      // If the button element is found, simulate a click event on it
      if (button) {
        button.click();
      } else {
        console.error("Button with specified value not found");
      }
    });

    await page.waitForNavigation();

    await page.goto("http://100.100.1.80/user.php?cont=change_service");
    await page.waitForSelector("#newsrvid");

    const options = await page.evaluate(() => {
      const allOptions = document.querySelectorAll("#newsrvid > option");
      return Object.values(allOptions).map((option) => ({
        text: option.textContent,
        value: (option as any).value,
      }));
    });

    const optionValue = options.find(
      (option) => option.text === currentService
    )?.value;
    await page.select("#newsrvid", optionValue);
    await page.evaluate(() => {
      // Find the input button element by its value
      const button = document.querySelector(
        `input[type="submit"][value="التالي>"]`
      ) as HTMLInputElement;
      // If the button element is found, simulate a click event on it
      if (button) {
        button.click();
      } else {
        console.error("Button with specified value not found");
      }
    });
    await page.waitForNavigation();
    await page.evaluate(() => {
      // Find the input button element by its value
      const button = document.querySelector(
        `input[type="submit"][value="تأكيد وأنهاء"]`
      ) as HTMLInputElement;
      // If the button element is found, simulate a click event on it
      if (button) {
        button.click();
      } else {
        console.error("Button with specified value not found");
      }
    });

    await page.waitForNavigation()

    await browser.close();

    if ((result as any).error) {
      return res.status(401).json({ msg: (result as any).error });
    }

    res.json({ msg: "تم تجديد الباقة بنجاح.انتظر دقيقة وسيعمل الانترنت" });
  } catch (error) {
    console.error("Error occurred during renew:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

const port = 5000

app.listen(port, () => console.log(`Server is running on port ${port}`));
