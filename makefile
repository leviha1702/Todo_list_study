db-build:
	@echo "Starting database..."
	docker-compose -f docker-compose.yml up -d --build
db-start:
	@echo "Starting database..."
	docker-compose -f docker-compose.yml up -d
db-stop:
	@echo "Stopping database..."
	docker-compose -f docker-compose.yml down
	
