This is the 7th and last project of the OpenClassrooms Web Developper formation : Groupomania

///SETUP THE PROJECT///
- Open 2 terminals : 
    - cd frontend for the frontend, run npm install and then run 'npm install --save-dev sequelize-cli' to install sequelize globally on your device
    
    - cd backend for the frontend, run npm install and then run 'npm install -g nodemon' to install nodemon globally on your device
        - in the backend, in the images folder, create a 'posts' folder and a 'profils' folder
        - you can use MAMP to host you mysql database. You must install mySQL as well, and configure the port.


//LAUNCH PROJECT//
- Frontend : cd frontend -> npm run dev
- Backend : cd backend -> nodemon server or node server
 

Local access to mySQL with MAMP : cd c:\MAMP\bin\mysql\bin -> .\mysql -u root -p -> Enter password -> use database_development_groupomania;


//MYSQL//
show all elements from a table : select * from `table`;



RESET THE DATABASE : 
=> sequelize db:drop
=> sequelize db:create 
=> sequelize db:migrate

SET ADMIN : 
replace * by the id of the user you want to turn into an ADMIN

update `users` set `isAdmin` = '1' where `id` = '*';