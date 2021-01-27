const { Builder, By, Key } = require("selenium-webdriver");
var assert = require('assert')

const { ebayHome } = require("./page_objects/ebayHome")
const { ebayProductDetails } = require("./page_objects/ebayProductDetails")
const { ebayCart } = require("./page_objects/ebayCart")

function assertIsSame(text1, text2) {
    try {
        assert(text1 === text2)
        console.log(`Verify [${text1}] == [${text2}] - PASS`)
    } catch (err) {
        console.log(`Verify [${text1}] == [${text2}] - FAIL`)

    }
}

// Search for 'Bike', select first search result, Add to Cart, Goto Cart, verify that the item added to cart is 
// the correct item.
async function testCase1() {

    driver = await new Builder().forBrowser("chrome").build();
    driver.manage().setTimeouts({ implicit: 20000, pageLoad: 20000, script: 20000 })

    const ebay = new ebayHome(driver)
    const productDetails = new ebayProductDetails(driver)
    const cart = new ebayCart(driver)

    await ebay.goto("http://ebay.com")
    await ebay.enterSearch("Bike")

    // Note: I need to filter for Buy It Now results, as Auction items do not have AddToCart button. 
    await ebay.clickBuyItNowBtn()
    await ebay.clickSearchResult(1)

    // Item number to be used later for verification
    await productDetails.scrollIntoViewItemNumber()
    const storedItemNumber = await productDetails.returnItemNumber()
    console.log('storedItemNumber =', storedItemNumber)

    // Check first if there are any option selections (eg., colour), and select first option for each
    await productDetails.selectFirstItemInEachDropDown()
    await productDetails.clickAddToCartBtn()
    await productDetails.clickGotoCartBtn()

    // Verify correct item by clicking on item in the cart and verifying that the Item number is the same as previously stored
    await cart.clickItemLink()
    await productDetails.scrollIntoViewItemNumber()
    assertIsSame(storedItemNumber, await productDetails.returnItemNumber())

    driver.close()

}

testCase1()
