.PHONY: build-backend build-frontend build deploy_dev deploy_dev_down

build-backend:
	docker build -t htx-task-assignment-backend -f build/backend/Dockerfile .

build-frontend:
	docker build -t htx-task-assignment-frontend -f build/frontend/Dockerfile .

build: build-backend build-frontend

deploy_dev:
	docker-compose -f deployments/dev/docker-compose.yml up -d

deploy_dev_down:
	docker-compose -f deployments/dev/docker-compose.yml down