import pdfplumber
from io import BytesIO

def extract_text_from_pdf(pdf_content: bytes) -> str:
    """Extract text from PDF bytes using pdfplumber"""
    try:
        text = ""
        with pdfplumber.open(BytesIO(pdf_content)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return text.strip()
    except Exception as e:
        raise Exception(f"PDF text extraction failed: {str(e)}")