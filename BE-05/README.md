@"
# Task API with Postgres & Docker

CRUD API for managing tasks, containerized with Docker and Postgres.

## Quick Start

\`\`\`bash
docker compose up
\`\`\`

Visit http://localhost:3000/tasks

## Endpoints

GET /tasks - Get all tasks
GET /tasks/:id - Get task by ID
POST /tasks - Create task
PUT /tasks/:id - Update task
DELETE /tasks/:id - Delete task

All endpoints return proper status codes (200, 201, 204, 400, 404).
"@ | Out-File -Encoding utf8 README.md