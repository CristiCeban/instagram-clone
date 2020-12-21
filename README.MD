**Instagram clone with different features**

This app is a university project to show the works of REST API application.

For Client was used:
* React (the latest version with hooks and functional paradigm)
* Redux (for state-management)
* Thunk (for async actions with redux)
* Material-UI (The Main View library)
* Axios (for API requests on the client(authorized with JWT TOKEN))
* React-Router (for navigation purpose)

For Server was used:
* Spring-Boot (API Framework based on Spring)
* JDBC (for connection with DataBase(MySql))
* Spring-Security-**JWT** (for users authentication and users management)
* Hibernate (for work with DataBase using Classes)

For DataBase was used MySql and PhpMyAdmin for the database management 

To run this app you should have the following requirements:
* Maven (https://maven.apache.org/install.html)
* NPM (https://www.npmjs.com/get-npm)

To run this app:
* git clone https://github.com/CristiCeban/instagram-clone
* import db from the cloned repository in your db server(I was using PhpMyAdmin)
* change the following file server/src/main/resources/application.properties 
  1) spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:3306/db_insta - **3306 to your db port** and **db_insta to imported db name**
  2) spring.datasource.username=instauser -  **instauser to your db userName**
  3) spring.datasource.password=sanea **sanea to your db password**  
* open 2 terminals in the cloned repository
1)  * cd server
    * mvn spring-boot:run (this will install all dependencies for the server from maven,this can last for ~ 5 minutes,in dependency of internet connection and the power of the pc,and then this will start the server)
2)  * cd client
    * npm install (this will install all dependencies for the client from npm)
    * npm run (this will run the app in the browser)

By default 
* Server have default port **8080**
* Client have default port **1234**
* If some of them is occupied 
    1) netstat -ano | findstr :occupied_port (this will find the pid which is using the occupied port)
    2) taskkill /PID pid_from_above /F
* Rerun the app    
    
Also, you can check endpoints of server using the postman Collection from postman.txt

users:
1) * a@mail.com 
    * password
2) * test@mail.com 
    * password
