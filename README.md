# htx-task-assignment

## Deploy (run the application without a development workflow)

Requires `make` and Docker with Docker Compose.

1. Build all Docker containers

   ```bash
   make build
   ```

1. (Optional) Set an OpenAI API key to enable title-based skill classification. Export it in your shell or add it to the [development backend environment file](deployments/dev/.env.backend-dev):

   ```bash
   export OPENAI_API_KEY=<openai_api_key_here>
   ```

1. Deploy with `docker compose`

   ```bash
   make deploy_dev
   ```

Stop the deployment with `make deploy_dev_down`.

1. Open http://localhost:81

## Development setup

1. Clone the repository:

   ```bash
   git clone git@github.com:tw-thamsy/htx-task-assignment.git
   cd htx-task-assignment
   ```

1. Install the required tools:

- Node.js v24.21.0. The repository uses `asdf` to manage Node.js versions, but you can use `nvm` or install it from the [official Node.js website](https://nodejs.org/en/download).

  ```bash
  asdf install
  ```

- Docker
  - On macOS, install Docker and Colima with Homebrew:

    ```bash
    brew install docker colima
    ```

1. Install dependencies from the repository root and each application directory:

- Repository tools, including linters (run from the repository root):
  ```bash
  npm ci
  ```
- Backend (run from `backend/`):
  ```bash
  cd backend
  cp .env.example .env
  npm ci
  cd -
  ```
- Frontend (run from `frontend/`):
  ```bash
  cd frontend
  npm ci
  cd -
  ```

## Quickstart

1. Start the infrastructure:

- Start Colima if it is not already running:
  ```bash
  colima start
  ```
- Start PostgreSQL and apply database migrations:
  ```bash
  make deploy_local_infra
  ```

1. In a terminal, start the backend:

   ```bash
   cd backend
   npm run start:dev
   ```

1. In another terminal, start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

## Development

Install [Bruno](https://www.usebruno.com/) and import the collection from the [`api/`](api) directory. It contains example HTTP requests and environments; select the environment that matches the API instance you are using.

## Design decisions

Refer to [design-decisions.md](docs/design-decisions.md)
