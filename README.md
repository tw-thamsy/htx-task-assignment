# htx-task-assignment

## Deploy (Just launch, not for development)

Requires `make`, and `docker`

1. Build all Docker containers

   ```bash
   make build
   ```

1. (Optional) Export OpenAI key to use the classifier. OR add it into [.env.backend-dev](deployments/dev/.env.backend-dev) file

   ```bash
   export OPENAI_API_KEY=<openai_api_key_here>
   ```

1. Deploy with `docker compose`

   ```bash
   make deploy_dev
   # `make deploy_dev_down` to stop (try it if there's any errors in deployment)
   ```

1. Open http://localhost:81

## Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:tw-thamsy/htx-task-assignment.git
   cd htx-task-assignment
   ```

1. Install infrastructure dependencies:

- NodeJS v24.21.0
  - This repository uses `asdf` to manage the nodeJS versions. However, feel free to use `nvm` or download from the [Official NodeJS Website](https://nodejs.org/en/download).

    ```bash
    asdf install
    ```

- Docker
  - Install docker

    ```bash
    # If using MacOS, install docker with HomeBrew, and Colima for the runtime
    brew install docker colima
    ```

1. Install application dependencies

- Tools for whole repo (linters)
  ```bash
  npm ci
  ```
- Backend
  ```bash
  cd backend
  cp .env.example .env
  npm ci
  cd -
  ```
- Frontend
  ```bash
  cd frontend
  npm ci
  cd -
  ```

## Quickstart

1. Start Infrastructure
   - Start Docker (if not already autostarted)
     ```bash
     colima start
     ```
   - Deploy Postgres and Migrate
     ```bash
     make deploy_local_infra
     ```

1. Run Backend

   ```bash
   cd backend
   npm run start:dev
   ```

1. Run Frontend
   ```bash
   cd frontend
   npm run dev
   ```

## Development

Install [bruno](https://www.usebruno.com/) the API client. And import the collection from the [/api](api) folder. Environment and example http requests are all there.

## Design decisions

Refer to [design-decisions.md](docs/design-decisions.md)
