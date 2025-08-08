const { Builder, By } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Editar Compra con Login", function () {
  this.timeout(60000); 

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
    
  });

  it("Debe loguearse, editar una compra y redirigir a /compras", async function () {
    
    await driver.get("http://localhost:5000/login");
    await driver.findElement(By.name("username")).sendKeys("123");
    await driver.findElement(By.name("password")).sendKeys("123");
    await driver.findElement(By.css("button[type='submit']")).click();
    await delay(2000);

    const urlDespuesLogin = await driver.getCurrentUrl();
    if (!urlDespuesLogin.includes("/compras")) {
      throw new Error("No se redirigió a /compras después del login");
    }

   
    await driver.get("http://localhost:5000/compras");


    const botonEditar = await driver.findElement(By.css("a.btn-warning"));
    await botonEditar.click();
    await delay(2000);

 
    const inputProducto = await driver.findElement(By.id("producto"));
    await inputProducto.clear();
    await inputProducto.sendKeys("Producto Modificado");

    const inputCantidad = await driver.findElement(By.id("cantidad"));
    await inputCantidad.clear();
    await inputCantidad.sendKeys("99");

    const inputPrecio = await driver.findElement(By.id("precio"));
    await inputPrecio.clear();
    await inputPrecio.sendKeys("99.99");

    await delay(1000);


    await driver.findElement(By.css("button.btn-success")).click();
    await delay(2000);

    const urlDespuesEditar = await driver.getCurrentUrl();
    if (!urlDespuesEditar.includes("/compras")) {
      throw new Error("No se redirigió a /compras después de editar compra");
    }
  });
});

//npx mocha test/editarCompra.test.js
