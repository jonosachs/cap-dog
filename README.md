# CapDog - Capital City Finder

Spring Boot API serving selected country data with mini JavaScript front-end for search and retrieval.

![Capital City Finder UI](img.png?v=2)

## Stack

- Spring Boot 3, Java 17, Maven
- PostgreSQL + Spring Data JPA
- Bootstrap 5 (via CDN)
- Vanilla JavaScript
- Docker and Docker Compose for local orchestration

## How it works

- The backend seeds country data from `countries.json` into PostgreSQL at startup.
- REST endpoints expose the dataset: list all countries or fetch a single country by name (case-insensitive).
- The frontend fetches all countries on load, caches them in memory to avoid redundant API calls, and uses a `<datalist>` for native autocomplete suggestions. Country data is rendered in a Bootstrap table, with errors surfaced inline.

## Running with Docker Compose (recommended)

1. Create a `.env` file at the project root with your database credentials:

```
POSTGRES_USER=capital_user
POSTGRES_PASSWORD=capital_pass
POSTGRES_DB=capital_db
```

2. Start the stack:

```
docker compose up --build
```

3. Frontend: serve the contents of `frontend/` from an allowed origin (`http://127.0.0.1:5500`, `http://localhost:5500`, or `http://localhost:3000`; e.g., VS Code Live Server or `python -m http.server 5500`), then open the page in your browser.
4. Backend API: available at `http://localhost:8080`.

## Running locally without Docker

1. Start PostgreSQL and create a database.
2. Export environment variables for Spring Boot (values should match your local DB):

```
export SPRING_URL=jdbc:postgresql://localhost:5432/capital_db
export SPRING_USERNAME=your_db_user
export SPRING_PASSWORD=your_db_password
```

3. Boot the API:

```
cd backend
./mvnw spring-boot:run
```

4. Serve the frontend (`http://127.0.0.1:5500`, `http://localhost:5500`, or `http://localhost:3000` are allowed for CORS):

```
cd frontend
npx serve .
```

5. Open `http://127.0.0.1:5500` and search for a country.

## Tests

- Backend unit tests cover `CountryService` (mapping DB results to DTOs) and `CountryController` (JSON shape and status codes via `@WebMvcTest` with mocked service).
- Run all backend tests:

```
cd backend
./mvnw test
```

- Frontend Jest tests cover client helpers (e.g., `getCountry` contract with the API module).

```
cd frontend
npm test
```

## API

- `GET /countries` — returns all country/capital pairs.
- `GET /countries/{countryName}` — returns a single entry; 404 if not found.

Example:

```
curl http://localhost:8080/countries/France
```

Response:

```json
{
  "country": "France",
  "code": "FR",
  "capital": "Paris",
  "region": "Europe",
  "population": "65273511",
  "currency": "Euro"
}
```

## Frontend use

- Start typing a country name — suggestions appear via native browser autocomplete.
- Click a suggestion or press Enter / click Submit to fetch the country data.
- Validation and errors are surfaced inline (e.g., missing input, country not found).

## Project layout

- `backend/` — Spring Boot service, JPA entities, seed loader, API controllers.
- `frontend/` — static HTML/CSS/JS client.

## Notes

- Swagger UI is available when running the backend at `http://localhost:8080/swagger-ui.html`.

**README generated using Claude Code.
