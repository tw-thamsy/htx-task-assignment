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


## Usage

1. Start Infrastructure
    - Start Docker (if not already autostarted)
      ```bash
      colima start
      ```
