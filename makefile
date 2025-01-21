include .env
############### Database ###########
db-build:
	@echo "Starting database..."
	docker-compose -f docker-compose.yml up -d --build
db-start:
	@echo "Starting database..."
	docker-compose -f docker-compose.yml up -d
db-stop:
	@echo "Stopping database..."
	docker-compose -f docker-compose.yml down	
db-export:
	@echo "Exporting database..."
	docker exec -t $(POSTGRES_HOST_CONTAINER) pg_dumpall -c -U $(POSTGRES_USER) > ./database/data/dump.sql
db-import:
	@echo "Importing database..."
	powershell -Command "Get-Content ./database/data/dump.sql | docker exec -i postgresql psql -U levihadev -d todo_list_pro"

