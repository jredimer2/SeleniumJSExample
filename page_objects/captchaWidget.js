
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert')


class captchaWidget {

    constructor(driver) {
        this.driver = driver
    }

    async switchFrame() {
        try {
            const iframes = await this.driver.findElements(By.css("iframe"))
            console.log("iframes count =", iframes.length)

            for (let i = 0; i < iframes.length; i++) {
                console.log(`iframe [${i}]  name [${await iframes[i].getAttribute("name")}]`)
            }

            await this.driver.switchTo().frame(0)

        } catch (err) {
            console.error(err)
        }
    }

    // switch back to main frame
    async switchBackFrame() {
        try {
            await this.driver.switchTo().defaultContent()
        } catch (err) {
            console.error(err)
        }
    }

    async getNoRobotLabel() {
        try {
            return await driver.findElement(By.xpath("//label[contains(text(), 'not a robot')]"))
        } catch (err) {
            console.error(err)
        }
    }


    // If I'm not a robot checkbox is displayed, it won't throw an exception, thus it passes.
    // Otherwise an exception is thrown and it fails.
    async assertIsNotARobotDisplayed(driver) {
        try {
            await this.getNoRobotLabel()
            console.log(`Verify I'm not a robot checkbox is displayed - PASS`)
        } catch (err) {
            console.log(`Verify I'm not a robot checkbox is displayed - FAIL`)
            console.error(err)
        }
    }

}


module.exports = { captchaWidget }