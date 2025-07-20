Document Q&A System – Node.js + Qdrant + Vercel AI SDK
This is a full-stack application that allows you to:

Ingest documents from Google Drive

Store text chunks in Qdrant with OpenAI embeddings

Ask questions about those documents using an AI-powered chat interface.


 Prerequisites
Install these tools before running:

Node.js (v18 or later): Download Node.js

Docker (for running Qdrant): Download Docker

Git (for cloning or pushing to repo)

OpenAI API Key – from platform.openai.com/account/api-keys

Google Cloud service account with Drive API access.



 Setup Instructions
1. 🚀 Clone the project

git clone https://github.com/aihemanth/wolken.git
cd wolken

2. 📦 Install dependencies

npm install



Setup Qdrant with Docker

docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant


Create .env.local file
Create a .env.local file in the root folder with:

env
OPENAI_API_KEY=your-openai-api-key
GOOGLE_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"

🔑 To get Google credentials:

Go to Google Cloud Console

Create a Service Account

Enable Google Drive API

Generate a JSON key and copy the values above

Share the desired Google Drive files with the service account's email.


Run the app locally
To start the dev server:

npm run dev



Ingest a document
Run this curl command (replace FILE_ID):

curl -X POST http://localhost:3000/api/mcp/ingest \
  -H "Content-Type: application/json" \
  -d '{"fileId": "your-google-drive-file-id"}'


Ask a question

curl -X POST http://localhost:3000/api/mcp/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What is this document about?"}'

