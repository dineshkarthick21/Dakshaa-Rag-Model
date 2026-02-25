import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import CharacterTextSplitter

load_dotenv()

with open("data.txt", "r", encoding="utf-8") as file:
    text = file.read()

text_splitter = CharacterTextSplitter(
    chunk_size=200,
    chunk_overlap=20
)

docs = text_splitter.create_documents([text])

# Google Gemini Embeddings (text-embedding-004)
embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")

vectorstore = FAISS.from_documents(docs, embeddings)

vectorstore.save_local("vector_db")

print("✅ Vector DB Created with Gemini Embeddings!")