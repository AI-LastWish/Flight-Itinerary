# ItineraryFlight - A secured RESTful API for Itinerary flight

## Setup

1. Clone the repository
2. Install the dependencies: `yarn install` or `yarn`
3. Copy the `.env.example` file to `.env` and update the necessary variables: `cp .env.example .env`
4. Run the migrations:
  - `docker compose up --build`
  - Open a new tab in your terminal, then type `docker ps`. The result should be something like this:
      + CONTAINER ID   IMAGE             COMMAND                  CREATED          STATUS          PORTS                               NAMES
      + 18ce7687a5a9   namastecorp-app   "docker-entrypoint.s…"   27 seconds ago   Up 26 seconds   0.0.0.0:3000->3000/tcp              namastecorp-app-1
      + e23e5c7ca6c5   mysql:8           "docker-entrypoint.s…"   27 seconds ago   Up 26 seconds   33060/tcp, 0.0.0.0:3308->3306/tcp   namastecorp-mysql-1
  - Then run `docker exec -it 18ce7687a5a9 /bin/sh`, with `18ce7687a5a9` is the CONTAINER ID of `namastecorp-app` image
  - Run `yarn migration:run`
5. Boot the server: `yarn dev`
6. Access the REST api on the url `http://localhost:3000` or the port you specified in `.env`
7. Import `/postman/namastecorp.postman_collection.json` to Postman to test the APIs
8. Run unit test: `yarn test`

## Tools and Technologies Used
- NodeJS
- TypeScript
- MySQL
- TypeORM

## Available scripts

- `typeorm`: Runs the TypeORM CLI with the `data-source.ts` file.
- `migration:show`: Shows all the executed migrations.
- `migration:create`: Creates a new migration. You need to provide a name for the migration. Example: `yarn migration:create create_users_table`.
- `migration:run`: Runs all pending migrations.
- `migration:revert`: Reverts the last executed migration.

## Creating a new migration

To create a new migration, run the following command:

`yarn migration:create <migration-name>` for example: `yarn migration:create create_users_table`

> This will create a new migration file in the `src/database/migrations` directory.

You can then edit the migration file and define the necessary schema changes.

## Reverting a migration

To revert the last executed migration, run the following command: `yarn migration:revert`

## API endpoints

### Itinerary

- `GET /itinerary`: Get all itineraries
- `GET /itinerary/:id`: Get a itinerary by ID
- `POST /itinerary`: Create a new itinerary 
- `POST /itinerary/all`: Create a new itinerary list
- `PUT /itinerary/:id`: Update a itinerary by ID 
- `DELETE /itinerary/:id`: Delete a itinerary by ID 

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.





