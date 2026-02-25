# RAG Dakshaa - Intelligent Q&A System 🧠

A full-stack Retrieval Augmented Generation (RAG) application built for Dakshaa Techno-Cultural Fest. Powered by FastAPI, React, LangChain, FAISS, and Google Gemini to provide instant, accurate answers about the event.

## 🌟 Features

- **Intelligent Document Search**: Uses FAISS vector database for efficient semantic search across Dakshaa event information
- **AI-Powered Responses**: Leverages Google Gemini 2.5 Flash for accurate, context-aware answers
- **Modern Full-Screen UI**: Beautiful React frontend with immersive chat experience
- **Dark/Light Theme**: Theme toggle with smooth transitions and proper contrast
- **Real-time Chat**: Interactive chat interface with typing indicators and timestamps
- **Context-Aware**: Retrieves relevant documents before generating responses
- **Clean Output**: Automatically removes markdown formatting for plain text responses
- **Fast & Scalable**: FastAPI backend with async support
- **Custom Branding**: Dakshaa logo and branded interface

## 🏗️ Tech Stack

### Backend
- **FastAPI**: High-performance Python web framework
- **LangChain**: Framework for building LLM applications
- **FAISS**: Facebook AI Similarity Search for vector storage
- **Google Gemini 2.5 Flash**: Powerful LLM for text generation
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
│   ├── data.txt              # Dakshaa event knowledge base
│   ├── ingest.py             # Script to create vector embeddings
│   ├── main.py               # FastAPI application
│   ├── requirements.txt      # Python dependencies
│   └── vector_db/            # FAISS vector database (generated)
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── image.png     # Dakshaa logo
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

1. Open the application in your browser at `http://localhost:5173`
2. Click the suggestion button "Tell me all about Dakshaa" or type your own question
3. Press Enter or click the send button
4. The AI will retrieve relevant context from the Dakshaa knowledge base and generate a response
5. Toggle between light and dark themes using the ☀️/🌙 button in the header
6. All responses are automatically cleaned of markdown formatting for better readability

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
- **Dark Theme**: Black background with gradient navbar (default)
- **Light Theme**: White background with light gray navbar
- Theme preference is saved in localStorage
- Smooth transitions between themes
- Clear visual separation between navbar and content area

## 🔧 Configuration

### Backend Configuration
Edit `backend/main.py` to customize:
- LLM model (currently using `gemini-2.5-flash`)
- Vector search parameters (k=3 for retrieval)
- CORS settings (configured for localhost:5173)
- Temperature (set to 0 for consistent responses)
- Markdown cleaning function for output formatting

### Knowledge Base
Edit `backend/data.txt` to update Dakshaa event information:
- Event details and schedule
- Technical and cultural activities
- Workshop information
- Registration process
- Contact information

### Frontend Configuration
Edit `frontend/src/App.jsx` to customize:
- API base URL (default: http://localhost:8000)
- Suggestion prompts (currently: "Tell me all about Dakshaa")
- UI components and branding
- Logo (stored in `src/assets/image.png`)

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
1. Edit `backend/data.txt` with updated Dakshaa information
2. Run `python ingest.py` to update the vector database
3. Restart the backend server

### Customizing the UI
- Edit `frontend/src/index.css` for theme colors and styles
- Modify `frontend/src/App.jsx` for component structure
- Replace `frontend/src/assets/image.png` with your custom logo
- Update branding text in the header and footer

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
- K.S.Rangasamy College of Technology for Dakshaa fest

---

**@RAG Dakshaa - All rights reserved**
