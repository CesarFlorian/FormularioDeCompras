const { Builder, By, until } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");
const assert = require("assert");

describe("Flujo para borrar una compra con confirmación", function () {
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
    await driver.sleep(10000);
    await driver.quit();
  });

  it("Debe loguearse y borrar la primera compra con confirmación", async () => {
    await driver.get("http://localhost:5000/login");

    
    await driver.findElement(By.name("username")).sendKeys("123");
    await driver.findElement(By.name("password")).sendKeys("123");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.sleep(1000);

   
    await driver.get("http://localhost:5000/compras");

    
    await driver.wait(
      until.elementLocated(By.css("form.d-inline button.btn-danger")),
      5000
    );

    
    await driver.findElement(By.css("form.d-inline button.btn-danger")).click();

    
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert();
    await alert.accept();

    await driver.sleep(2000); 

   
    const urlActual = await driver.getCurrentUrl();
    assert.strictEqual(urlActual, "http://localhost:5000/compras");
  });
});
