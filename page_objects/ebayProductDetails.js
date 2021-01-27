
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert')


class ebayProductDetails {
    constructor(driver) {
        this.driver = driver
    }

    async getItemNumberComponent() {
        try {
            return await this.driver.findElement(By.id("descItemNumber"))
        } catch (err) {
            console.error(err)
        }
    }

    async getAddToCartBtn() {
        try {
            return await this.driver.findElement(By.id("atcRedesignId_btn"))
        } catch (err) {
            console.error(err)
        }
    }

    async getListOfDropdownMenus() {
        try {
            const productOptionsPanel = await driver.findElement(By.className('nonActPanel'));
            return await productOptionsPanel.findElements(By.css("select"))
        } catch (err) {
            console.error(err)
        }
    }

    async getGotoCartBtn() {
        try {
            const dialog = await driver.findElement(By.xpath("//div[@role='dialog']"))
            return await dialog.findElement(By.xpath("//a[contains(@class, 'btn-scnd')]"))
        } catch (err) {
            console.error(err)
        }
    }

    async returnItemNumber() {
        try {
            return await (await this.getItemNumberComponent()).getText()
        } catch (err) {
            console.error(err)
        }
    }

    async selectFirstOption(dropDown) {
        try {
            const options = await dropDown.findElements(By.css('option'))
    
            options.map(async (option) => {
                const text = await option.getText()
                console.log('text =', text)
            })
  
            await options[1].click()
    
        } catch (err) {
            console.error(err)
        }
    }

    async selectFirstItemInEachDropDown() {
        const dropDownList = await this.getListOfDropdownMenus()
        return Promise.all(dropDownList.map(async (dropDown) => {
            await this.selectFirstOption(dropDown)
        }))
    }

    async clickAddToCartBtn() {
        try {
            await (await this.getAddToCartBtn()).click()
        } catch (err) {
            console.error(err)
        }
    }

    async clickGotoCartBtn() {
        try {
            await (await this.getGotoCartBtn()).click()
        } catch (err) {
            console.error(err)
        }
    }

    async scrollIntoViewItemNumber() {
        try {
            const itemNum = await this.getItemNumberComponent()
            await this.driver.executeScript("arguments[0].scrollIntoView(false);", itemNum);
        } catch (err) {
            console.error(err)
        }
    }
}


module.exports = { ebayProductDetails }