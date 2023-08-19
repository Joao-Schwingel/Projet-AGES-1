.PHONY: drop drop-force run-database run-server

drop:
	docker-compose down

drop-force: drop
	docker-compose down -v && cd prisma && rmdir /s /q migrations

run-database: 
	npm run start:db

run-server:
	timeout 5 && npm run codegen && npm run migrate && npm run seed && npm run start:dev

run: run-database run-server
