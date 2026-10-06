# htx-task-assignment

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
    cp .env.local .env
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

## Deploy (all docker containers)

Requires `make`, install if not yet installed

1. Build all Docker containers
   ```bash
   make build
   ```

1. Deploy with `docker compose`
   ```bash
   make deploy_dev
   # `make deploy_dev_down` to stop
   ```