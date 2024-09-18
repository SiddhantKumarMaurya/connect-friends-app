## How to install and run
1. clone the repository
2. run backend:
    - navigate to `mern-friend-app/server` and run command `npm install`, this will install all the necessary dependencies.
    - make a `.env` file at this location and store the following:
        - `MONGO_URI="<Your-mogodb-uri>"`, you can find your mongodb uri in MongoDB Atlas
        - `JWT_SECRET="<Your-jwt-secret>"`, to generate your JWT_SECRET run the command `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" and copy the output. This output is your JWT_SECRET
    - run command `npm start`, this will run the backend at `https://localhost:5000`
3. run frontend:
    - navigate to `mern-friend-app/client` and run command `npm install`, this will install all the necessary dependencies.
    - run command `npm start`, this will run the frontend at `https://localhost:3000`
