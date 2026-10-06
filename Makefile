.PHONY: build_backend build_frontend build deploy_dev deploy_dev_down migrate_local migrate_dev test

build_backend:
	docker build -t htx-task-assignment-backend -f build/backend/Dockerfile .

build_frontend:
	docker build -t htx-task-assignment-frontend -f build/frontend/Dockerfile .

build: build_backend build_frontend

deploy_local_infra:
# Done separately so that error from flyway migrate shows
	docker-compose -f deployments/local/docker-compose.yml up -d postgres
	docker-compose -f deployments/local/docker-compose.yml run --rm flyway migrate 

deploy_local_infra_down:
	docker-compose -f deployments/local/docker-compose.yml down

deploy_dev:
	docker-compose -f deployments/dev/docker-compose.yml up -d

deploy_dev_down:
	docker-compose -f deployments/dev/docker-compose.yml down

## Database migrations (for fine-grained control)

migrate_local:
	docker compose -f deployments/local/docker-compose.yml run --rm flyway migrate

migrate_dev:
	docker compose -f deployments/dev/docker-compose.yml run --rm flyway migrate

## test
test:
	cd backend && npm test