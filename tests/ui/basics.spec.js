const {test, expect} = require('playwright/test');

test('Incorrect Credentials:E2E', async ({page})=>{
        const username = page.locator("#username");
        const password = page.locator("#password");
        const signInBtn = page.locator("#signInBtn");
        const cardTitles = page.locator(".card-body a");
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
        expect(await page.title()).toBe("LoginPage Practise | Rahul Shetty Academy");

        await username.fill("rahulshetty");
        await password.fill("learning");
        await signInBtn.click();
        await expect(page.locator("[style*= 'block']")).toContainText("Incorrect username/password.");

        await username.fill("rahulshettyacademy");
        await password.fill("Learning@830$3mK2");
        await signInBtn.click();
        //console.log(await cardTitles.first().textContent());
        //console.log(await cardTitles.nth(1).textContent());
        console.log(await cardTitles.allTextContents());

        
});

test('radio, dropdown', async ({page})=>{
        const username = page.locator("#username");
        const password = page.locator("#password");
        const signInBtn = page.locator("#signInBtn");
        const cardTitles = page.locator(".card-body a");
        const dropdown = page.locator("select.form-control");
        const documentRequest = page.locator("[href*='documents-request']");
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await username.fill("rahulshettyacademy");
        await password.fill("Learning@830$3mK2");

        //select value from dropdown
        await dropdown.selectOption("Consultant");

        //select radio button
        await page.locator(".radiotextsty").last().click();

        //select web based alert box
        await page.locator("#okayBtn").click();
        await expect(await page.locator(".radiotextsty").last()).toBeChecked();

        await page.locator("#terms").check();
        await expect(page.locator("#terms")).toBeChecked();

        await page.locator("#terms").uncheck();
        await expect(page.locator("#terms")).not.toBeChecked();

        await expect(documentRequest).toHaveAttribute("class", "blinkingText");
        await documentRequest.click();


        await page.pause();

        
});

test('Child Windows Handling', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const documentRequest = page.locator("[href*='documents-request']");

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

const [newPage] = await Promise.all([
    context.waitForEvent('page'), // wait for the new page to open before clicking the link.
    documentRequest.click() ]);// give the new page context before clicking the link which opens the new page, so that we can handle the new page in the same test case.

        const text = await newPage.locator(".red").textContent();
        console.log(text);
        const arrayText = text.split("@");
        console.log(arrayText);

    
        const domain = arrayText[1].split(" ")[0];

        //switch back to the parent page
        await page.locator("#username").fill(domain);
        console.log(await page.locator("#username").inputValue());
        
});
