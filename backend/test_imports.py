import sys
try:
    import langchain
    print(f"langchain version: {langchain.__version__}")
    from langchain.chains import RetrievalQA
    print("Successfully imported RetrievalQA")
except ImportError as e:
    print(f"Import failed: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
