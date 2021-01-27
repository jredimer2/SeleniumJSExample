
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert')


class ebayHome {
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

    async getMyEbay() {
        try {
            return await this.driver.findElement(By.xpath("//a[contains(@href,'https://my.ebay.com')]"))
        } catch (err) {
            console.error(err)
        }
    }

    async getSearchBar() {
        try {
            return await driver.findElement(By.id("gh-ac"))
        } catch (err) {
            console.error(err)
        }
    }

    async getBuyItNowBtn() {
        try {
            return await driver.findElement(By.xpath("//h2[@class='srp-format-tabs-h2' and contains(text(),'Buy')]"))
        } catch (err) {
            console.error(err)
        }
    }

    // index starts with 1 for the first search result
    async getSearchResult(index) {
        try {
            const linkItem = await driver.findElement(By.xpath(`//li[contains(@class,'s-item')][${index}]`))
            const anchor = await linkItem.findElement(By.xpath("//a[contains(@class,'item__link')]"))
            return anchor
        } catch (err) {
            console.error(err)
        }
    }

    async clickMyEbay() {
        try {
            await (await this.getMyEbay()).click()
        } catch (err) {
            console.error(err)
        }
    }

    async enterSearch(str) {
        try {
           await (await this.getSearchBar()).sendKeys("Bike", Key.RETURN)
        } catch (err) {
            console.error(err)
        }
    }

    async clickBuyItNowBtn() {
        try {
            await (await this.getBuyItNowBtn()).click()
        } catch (err) {
            console.error(err)
        }
    }

    // index starts with 1 for the first search result
    async clickSearchResult(index) {
        try {
            await (await this.getSearchResult(index)).click()
        } catch (err) {
            console.error(err)
        }
    }
}


module.exports = { ebayHome }