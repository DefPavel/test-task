# Тестовое задание (Nest.js)

---
## Установка

### Шаги установки

1. Клонируйте репозиторий:

```bash
git clone https://github.com/DefPavel/test-task.git
cd test-task
```

2. Установить зависимости:

```bash
npm i
```

3. Запуск:

```bash
docker network create api_network
docker compose up --build -d
```
---

## Env

```
APP_PORT=3000
DB_HOST=postgres-db
DB_USER=root
DB_PASSWORD=root
DB_NAME=test-db
```
