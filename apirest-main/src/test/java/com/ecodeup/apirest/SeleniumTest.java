package com.ecodeup.apirest;

import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class SeleniumTest {

    //VARIABLES
    private WebDriver driver;
    private static final String TIPO_DRIVER = "webdriver.chrome.driver";
    private static final String PATH_DRIVER = "./src/test/resources/WebDriver/chromedriver.exe";
    private String URL = "http://localhost:3000";

    @BeforeClass
    public static void setUpBeforeClass(){
        System.out.println("INICIO DE TESTS");
        System.setProperty(TIPO_DRIVER, PATH_DRIVER);

    }

    @Before
    public void setUp(){
        driver = new ChromeDriver();
        driver.get(URL);
    }

    @Test
    public void testLogInAdmin(){
        WebElement LogInButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/nav/a[2]"));
        LogInButton.click();
        WebElement userName = driver.findElement(By.id("formBasicEmail"));
        userName.sendKeys("admin");
        WebElement password = driver.findElement(By.id("formBasicPassword"));
        password.sendKeys("admin");
        WebElement submitButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/form/button"));
        submitButton.click();

        WebElement titulo = driver.findElement(By.xpath("//*[@id=\"centro\"]"));
        Assert.assertEquals("Bienvenido al DashBoard de Administrador", titulo.getText());
    }

    @Test
    public void testLogInUser() {
    }

    @Test
    public void testLogInUserIncorrect() {
    }

    @Test
    public void testRegister() {
    }

    @Test
    public void testAdminAddHotel() {
    }

    @Test
    public void testAdminAddVuelo() {
    }

    @Test
    public void testAdminAddUser() {
    }

    @Test
    public void testAdminRemoveHotel() {
    }

    @Test
    public void testAdminRemoveVuelo() {
    }

    @Test
    public void testAdminRemoveUser() {
    }

    @Test
    public void testAdminModifyHotel() {
    }

    @Test
    public void testAdminModifyVuelo() {
    }

    @Test
    public void testAdminModifyUser() {
    }

    @Test
    public void testUserOfertas() {
    }

    @Test
    public void testUserfiltroHotel() {
    }

    @Test
    public void testUserfiltroVuelo() {
    }

    @Test
    public void testUserReservaHotel() {
    }

    @Test
    public void testUserReservaVuelo() {
    }

    @Test
    public void testUserGestionReservaHotel() {
    }

    @Test
    public void testUserGestionReservaVuelo() {
    }

    @Test
    public void testFooterInfo() {
    }


    @After
    public void tearDown(){
        driver.quit();
    }
}
