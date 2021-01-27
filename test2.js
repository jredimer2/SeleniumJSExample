const { Builder, By, Key } = require("selenium-webdriver");
const { ebayHome } = require("./page_objects/ebayHome")
const { ebaySignIn } = require("./page_objects/ebaySigIn")
const { captchaWidget } = require("./page_objects/captchaWidget")

// Goto MyEbay, sign in with email and incorrect password. Captcha will appear, verify that the Captcha widget is displayed.
// Note: Can't automate going past Captcha.
async function testCase2() {

    driver = await new Builder().forBrowser("chrome").build();
    driver.manage().setTimeouts({ implicit: 20000, pageLoad: 20000, script: 20000 })

    const ebay = new ebayHome(driver)
    const signin = new ebaySignIn(driver)

    await ebay.goto("http://ebay.com")
    await ebay.clickMyEbay()
    
    await signin.enterUserId("test@email.com")
    await signin.clickContinueBtn()
    await signin.enterPassword("pass")
    await signin.clickSigninBtn()

    const captcha = new captchaWidget(driver)
    await captcha.switchFrame()

    // Verify captcha is displayed. 
    // Note: In the original instructions, it says to verify the "Oops, that's not a match" message.
    //       But because of the captcha, I cannot proceed to the next page.
    //       Therefore, as alternative, I am checking if "I'm not a robot" message is displayed.
    //       This captcha widget is in an iFrame so it requires advanced Selenium usage of switching to another frame.
    //   
    await captcha.assertIsNotARobotDisplayed()

    await captcha.switchBackFrame()    
    driver.close()
}

testCase2()