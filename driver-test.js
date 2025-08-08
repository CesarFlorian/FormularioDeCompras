const { Builder } = require("selenium-webdriver");

(async function testDriver() {
  try {
    console.log("Creando driver...");
    let driver = await new Builder().forBrowser("chrome").build();
    console.log("Driver creado OK");

    await driver.get("http://localhost:5000/login");
    console.log("Página cargada OK");

    await driver.quit();
    console.log("Driver cerrado OK");
  } catch (e) {
    console.error("Error en driver-test.js:", e);
  }
})();
