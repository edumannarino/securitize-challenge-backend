# Securitize Challenge: Backend
This challenge consists in developing a Backend for a Digital Wallet Dashboard. It manages the storage in a Database and expose an API for the services.
## Installation And Running

Install dependencies with your Package Manager and start the Server.

```console
$ npm install 
$ npm start
```

Or you can build a Docker Image and run it:
```console
$ docker build .
$ docker run -p 5000:5000 {Image}
```

*Note: A MongoDB server is required, so you can use an installed server or either run a image with Docker or Docker Compose*








    
## Observations

MongoDB is chosen to store the info about wallets. It's the best option since the kind of data to be store and also it's easy to scalate. But in case that a change of technology or library is needed, a Repository Pattern is implemented so we don't depend of implementations.

We also use dependency injection for the service that provides the Rates and the Blockchain info. In this case, I implemented the CoinGecko API and the Etherscan API, but it's easy to implement another solutions.
## Documentation

These are the endpoints provided and exposed for access:

*GET /wallets*: Returns a list with all wallets. 

*GET /wallets/:address*: Returns the info for the requested wallets.

*POST /wallets*: Adds a Wallet. 
    
    Body: {
        adress: string // Address of the Wallet
        favourite: boolean // Is a favourite Wallet 
        ethEur: number // Rate for ETH/EUR
        ethUsd: number // Rate for ETH/USD
    }

*PATCH /wallets/:address*: Update partially any info of a Wallet. 
    
    Body: {
        favourite: boolean // Is a favourite Wallet 
        ethEur: number // Rate for ETH/EUR
        ethUsd: number // Rate for ETH/USD
    }

*DELETE /wallets/:address*: Delete a Wallet. 

*GET /rates*: Get Rates for ETH/EUR and ETH/USD 
## Environment Variables

`PORT`: Port where the app wwill be running.

`MONGO_URI`: URI for the MongoDB connection.

`ETHERSCAN_URL`: URL for the Etherscan API.

`ETHERSCAN_API_KEY`: Key for the Etherscan API.

`COINGECKO_URL`: URL for the CoinGecko API.
## Some Suggested Features

- Add Authorization through API KEY (implementing an Auth Middleware).
- Secure endpoints.
- Caching and Pagination.