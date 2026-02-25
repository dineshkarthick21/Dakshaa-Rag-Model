# Dakshaa RAG Model 🧠

A full-stack Retrieval Augmented Generation (RAG) application built with FastAPI, React, LangChain, FAISS, and Google Gemini.

## 🌟 Features

- **Intelligent Document Search**: Uses FAISS vector database for efficient semantic search
- **AI-Powered Responses**: Leverages Google Gemini 2.5 Flash for accurate answers
- **Modern UI**: Beautiful React frontend with dark/light theme toggle
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Context-Aware**: Retrieves relevant documents before generating responses
- **Fast & Scalable**: FastAPI backend with async support

## 🏗️ Tech Stack

### Backend
- **FastAPI**: High-performance Python web framework
- **LangChain**: Framework for building LLM applications
- **FAISS**: Facebook AI Similarity Search for vector storage
- **Google Gemini**: Powerful LLM for text generation
- **Python 3.13**: Latest Python features

### Frontend
- **React 18**: Modern UI library
- **Vite**: Lightning-fast build tool
- **CSS3**: Custom styling with theme support
- **Fetch API**: For backend communication

## 📁 Project Structure

```
Rag_Fullstack/
├── backend/
│   ├── data.txt              # Your knowledge base documents
│   ├── ingest.py             # Script to create vector embeddings
│   ├── main.py               # FastAPI application
│   ├── requirements.txt      # Python dependencies
│   └── vector_db/            # FAISS vector database (generated)
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── App.css           # Component styles
│   │   ├── index.css         # Global styles & theme
│   │   └── main.jsx          # Entry point
│   ├── index.html            # HTML template
│   ├── package.json          # Node dependencies
│   └── vite.config.js        # Vite configuration
└── README.md                 # You are here
```

## 🚀 Getting Started

### Prerequisites

- Python 3.13 or higher
- Node.js 18 or higher
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dineshkarthick21/Dakshaa-Rag-Model.git
   cd Dakshaa-Rag-Model
   ```

2. **Set up the backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

4. **Prepare your knowledge base**
   
   Add your documents to `backend/data.txt`, then run:
   ```bash
   python ingest.py
   ```
   This creates the FAISS vector database from your documents.

5. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   Backend will run on `http://localhost:8000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 💡 Usage

1. Type your question in the chat input
2. Press Enter or click the send button
3. The AI will retrieve relevant context from your documents and generate a response
4. Toggle between light and dark themes using the theme button in the header

## 📝 API Endpoints

### GET `/`
Health check endpoint
```json
{
  "status": "ok",
  "message": "RAG Assistant API (Gemini) is running 🚀"
}
```

### POST `/ask`
Ask a question to the RAG system
```json
// Request
{
  "question": "What is Spring Boot?"
}

// Response
{
  "answer": "Spring Boot is a framework..."
}
```

## 🎨 Theme Support

The application supports both dark and light themes:
- **Dark Theme**: Black background with light text (default)
- **Light Theme**: White background with dark text
- Theme preference is saved in localStorage

## 🔧 Configuration

### Backend Configuration
Edit `backend/main.py` to customize:
- LLM model (currently using `gemini-2.5-flash`)
- Vector search parameters (k value for retrieval)
- CORS settings
- Temperature and other LLM parameters

### Frontend Configuration
Edit `frontend/src/App.jsx` to customize:
- API base URL
- Suggestion prompts
- UI components

## 📦 Dependencies

### Backend
- fastapi
- uvicorn
- langchain
- langchain-google-genai
- langchain-community
- langchain-text-splitters
- langchain-core
- faiss-cpu
- python-dotenv
- tiktoken
- pydantic

### Frontend
- react
- react-dom
- vite
- @vitejs/plugin-react

## 🛠️ Development

### Adding New Documents
1. Add text to `backend/data.txt`
2. Run `python ingest.py` to update the vector database
3. Restart the backend server

### Customizing the UI
- Edit `frontend/src/index.css` for theme colors and styles
- Modify `frontend/src/App.jsx` for component structure
- Update `frontend/src/App.css` for component-specific styles

## 🐛 Troubleshooting

### Backend Issues
- **Module not found**: Run `pip install -r requirements.txt`
- **API quota exceeded**: Wait for quota reset or upgrade your Gemini API plan
- **Vector DB not found**: Run `python ingest.py` to create it

### Frontend Issues
- **CORS errors**: Check backend CORS settings in `main.py`
- **Connection refused**: Ensure backend is running on port 8000
- **Build errors**: Delete `node_modules` and run `npm install` again

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

**Dinesh Karthick**
- GitHub: [@dineshkarthick21](https://github.com/dineshkarthick21)

## 🙏 Acknowledgments

- Google Gemini for the powerful LLM
- LangChain for the excellent framework
- FAISS for efficient vector search
- FastAPI for the amazing backend framework
- React and Vite for the frontend tools

---

**Built with ❤️ using LangChain · FAISS · FastAPI · React · Vite**
