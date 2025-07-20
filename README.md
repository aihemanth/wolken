<img width="1366" height="768" alt="1" src="https://github.com/user-attachments/assets/257006ca-2a2b-48c5-9a45-97d5d32d5189" /><img width="1366" height="768" alt="1" src="https://github.com/user-attachments/assets/311943de-6c16-4997-bd19-d3aaf1b29fc2" />Document Q&A System.

This is a full-stack application that allows you to:
      
    • Ingest documents from Google Drive.
      
    • Store text chunks in Qdrant with OpenAI embeddings.
      
    • Ask questions about those documents using an AI-powered chat interface.


 Prerequisites
Install these tools before running:

    • Node.js (v18 or later): Download Node.js
      
    • Docker (for running Qdrant): Download Docker
      
    • Git (for cloning or pushing to repo)
      
    • OpenAI API Key – from platform.openai.com/account/api-keys
      
    • Google Cloud service account with Drive API access.
      


 Setup Instructions
1. Clone the project

	git clone https://github.com/aihemanth/wolken.git

	cd wolken

2. Install dependencies

	npm install



Setup Qdrant with Docker

	docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant


Create .env.local file

	Create a .env.local file in the root folder with:

env

OPENAI_API_KEY=your-openai-api-key
GOOGLE_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
QDRANT_URL=http://localhost:6333
QDRANT_PORT=6333


 To get Google credentials:

    • Go to Google Cloud Console
      
    • Create a Service Account
      
    • Enable Google Drive API
      
    • Generate a JSON key and copy the values above
      
    • Share the desired Google Drive files with the service account's email.
      

Run the app locally

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

output:
<img width="1366" height="768" alt="1" src="https://github.com/user-attachments/assets/af702f58-b3ef-4c5b-a431-214d9e836aa1" />


