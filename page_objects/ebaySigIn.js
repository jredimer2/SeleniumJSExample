
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert')


class ebaySignIn {
    constructor(driver) {
        this.driver = driver
    }

    async goto(url) {
        try {
            await this.driver.get(url)
        } catch (err) {
            console.error(err)
        }
    }

    async getUserId() {
        try {
            return await driver.findElement(By.id("userid"))
        } catch (err) {
            console.error(err)
        }
    }

    async getContinueBtn() {
        try {
            return await driver.findElement(By.id("signin-continue-btn"))
        } catch (err) {
            console.error(err)
        }
    }

    async getPassword() {
        try {
            return await driver.findElement(By.id("pass"))
        } catch (err) {
            console.error(err)
        }
    }

    async getSigninBtn() {
        try {
            return await driver.findElement(By.id("sgnBt"))
        } catch (err) {
            console.error(err)
        }
    }

    async enterUserId(userId) {
        try {
            await (await this.getUserId()).sendKeys(userId)
        } catch (err) {
            console.error(err)
        }
    }

    async enterPassword(password) {
        try {
            await (await this.getPassword()).sendKeys(password)
        } catch (err) {
            console.error(err)
        }
    }

    async clickContinueBtn() {
        try {
            await (await this.getContinueBtn()).click()
        } catch (err) {
            console.error(err)
        }
    }

    async clickSigninBtn() {
        try {
            await (await this.getSigninBtn()).click()
        } catch (err) {
            console.error(err)
        }
    }
}


module.exports = { ebaySignIn }