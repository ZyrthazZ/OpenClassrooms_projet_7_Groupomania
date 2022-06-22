This is the 7th and last project of the OpenClassrooms Web Developper formation : Groupomania

///SETUP THE PROJECT///



//LAUNCH PROJECT//
- Frontend : cd frontend -> npm run dev
- Backend : cd backend -> nodemon server or node server

For the backend, you can use MAMP to host you mysql database. You must install mySQL as well, and configure the port. 

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