const { Builder, By } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");
const assert = require("assert");
const readline = require("readline");

function waitForEnter() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Presiona Enter para cerrar el navegador...", () => {
      rl.close();
      resolve();
    });
  });
}

describe("Flujo de agregar nueva compra", function () {
  this.timeout(30000); 

  let driver;

  before(async () => {
    const service = new edge.ServiceBuilder(
      "E:\\Descargas\\edgedriver_win64\\msedgedriver.exe"
    );
    const options = new edge.Options();
    driver = await new Builder()
      .forBrowser("MicrosoftEdge")
      .setEdgeOptions(options)
      .setEdgeService(service)
      .build();
  });

  after(async () => {
    
    await waitForEnter();
    await driver.quit();
  });

  it("Debe loguearse y crear una nueva compra", async () => {
    await driver.get("http://localhost:5000/login");

    await driver.findElement(By.name("username")).sendKeys("123");
    await driver.findElement(By.name("password")).sendKeys("123");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.sleep(1000);

    await driver.findElement(By.css("a[href='/compras/nueva']")).click();

    await driver.findElement(By.id("producto")).sendKeys("Arroz");
    await driver.findElement(By.id("cantidad")).sendKeys("2");
    await driver.findElement(By.id("precio")).sendKeys("3.50");

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.sleep(1000);
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, "http://localhost:5000/compras");

    const bodyText = await driver.findElement(By.tagName("body")).getText();
    assert.ok(bodyText.includes("Arroz"));
  });
});

//$ npx mocha test/compras.test.js
