import random
from langchain_community.vectorstores import Chroma
from langchain_google_vertexai import VertexAIEmbeddings
from PyPDF2 import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter

def main():
    # 1. Load PDF
    pdf_path = "/Users/gastondana/Portfolio/backend/project_docs/AI Room Designer - Final Doc.pdf"
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"

    # 2. Split into chunks
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_text(text)
    print(f"Total chunks created: {len(chunks)}")

    # 3. Generate embeddings using the UPDATED Vertex AI model
    embeddings = VertexAIEmbeddings(
        model_name="text-embedding-004",  # Updated model name
        project="sesa-trifecta-street-25",  # Your GCP project ID
        location="us-central1"
    )
    vectorstore = Chroma.from_texts(chunks, embedding=embeddings)

    # 4. Test retrieval with Top-k random selection
    query = "What features does the AI Room Designer offer?"
    top_k_results = vectorstore.similarity_search_with_score(query, k=5)  # Get top 5
    results = random.sample(top_k_results, k=min(3, len(top_k_results)))  # Pick 3 randomly from top 5

    for i, (res, score) in enumerate(results):
        print(f"\n--- Result {i+1} ---")
        print(f"Similarity score: {score:.4f}")
        print(res.page_content)

if __name__ == "__main__":
    main()