
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert')


class ebayCart {
    constructor(driver) {
        this.driver = driver
    }

    async getItemLink() {
        try {
            return await driver.findElement(By.xpath("//a[contains(@href, 'www.ebay.com/itm')]"))
        } catch (err) {
            console.error(err)
        }
    }

    async clickItemLink() {
        try {
            await (await this.getItemLink()).click()
        } catch (err) {
            console.error(err)
        }
    }
}


module.exports = { ebayCart }