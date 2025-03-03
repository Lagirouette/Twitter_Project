The goal of this project is to recreate Twitter. 

I took an example of the front page of the old twitter and recreated the it with NextJS ( a REACTJS framework ). I also use C# as backend to support the front.
As for the database, SQL Server is being used.

This was the template => ![Twitter-Web-Dark-Mode2](https://github.com/user-attachments/assets/0f6a2292-03bc-419f-9fed-ef395baf2537)

This is the front I created => ![Capture d'écran 2025-03-03 110221](https://github.com/user-attachments/assets/e8f0d6c2-c75c-46a5-8424-af67bf3fbdee)


TO LUNCH THE PROJECT : 

First of all you need to do => dotnet restore. In the command, to restore all the dependencies of the backend project. 

1. FIRST MIGRATION :
Go to the appsettings.json in the WEBAPI project. Change the DATAsource to match with yours. 
Now in the command do :  dotnet tool install --global dotnet-ef

then => dotnet ef migrations add InitialCreate
then => dotnet ef database update

And you do => dotnet run ; to lunch the backend.

2. RUN THE BACKEND :

Navigate to the Next.js project folder (usually inside the repository):

then=> npm install

And to run the front you do => npm run dev

You might have to change the APIs calls in the project. For me they come from http://localhost:5130, but the can come from somewhere else for you depending on the url of your already running backend. 
