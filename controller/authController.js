const { Builder, By, Key, until } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");
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

describe("Prueba búsqueda en Google con Edge", function () {
  this.timeout(0); // Sin límite de tiempo

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
    console.log("Prueba terminada. Navegador abierto.");
    await waitForEnter();
    if (driver) await driver.quit();
  });

  it("Debería buscar 'Selenium WebDriver' en Google", async function () {
    await driver.get("https://www.google.com");
    console.log("Página de Google abierta");
    await driver.sleep(2000);

    const searchBox = await driver.findElement(By.name("q"));
    await searchBox.sendKeys("Selenium WebDriver");
    console.log("Texto ingresado en búsqueda");
    await driver.sleep(1000);

    await searchBox.sendKeys(Key.RETURN);
    console.log("Búsqueda enviada");

    // Espera hasta que aparezcan resultados
    await driver.wait(until.titleContains("Selenium WebDriver"), 10000);
    console.log("Resultados cargados");

    await driver.sleep(5000); // Pausa para que puedas ver resultados
  });
});
