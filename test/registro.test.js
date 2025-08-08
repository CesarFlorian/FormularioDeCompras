const { Builder, By } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");
const assert = require("assert");

describe("Flujo de Registro de Usuario", function () {
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

  it("Debe registrar un nuevo usuario y redirigir al login", async () => {
    await driver.get("http://localhost:5000/register");

    const username = "user" + Math.floor(Math.random() * 10000); 
    const password = "123";

    await driver.findElement(By.name("username")).sendKeys(username);
    await driver.findElement(By.name("password")).sendKeys(password);
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.sleep(1000);

    const currentUrl = await driver.getCurrentUrl();

    
    assert.ok(currentUrl.includes("/login"), "No redirigió al login después del registro");

    
    const loginInputExists = await driver.findElement(By.name("username")).isDisplayed();
    assert.strictEqual(loginInputExists, true, "No se muestra el formulario de login");
  });
});


//npx mocha test/registro.test.js