const { Builder, By } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");
const assert = require("assert");
const readline = require("readline");

function waitForEnter() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question("Presiona Enter para cerrar el navegador...", () => {
      rl.close();
      resolve();
    });
  });
}

describe("Login exitoso con usuario válido", function () {
  this.timeout(0); 

  let driver;

  before(async function () {
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

  after(async function () {
    
    await waitForEnter();
    if (driver) await driver.quit();
  });

  it("Debe loguearse y redirigir a /compras", async function () {
    await driver.get("http://localhost:5000/login");

    await driver.findElement(By.name("username")).sendKeys("123");
    await driver.findElement(By.name("password")).sendKeys("123");

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.sleep(1000);
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, "http://localhost:5000/compras");
  });
});

//npm test