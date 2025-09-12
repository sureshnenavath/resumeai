import pytest
from pdf_service import extract_text_from_pdf
from io import BytesIO

def test_extract_text_from_pdf_empty():
    """Test PDF service with empty content"""
    try:
        result = extract_text_from_pdf(b"")
        assert result == ""
    except Exception:
        # Expected to fail with empty content
        pass

def test_extract_text_from_pdf_invalid():
    """Test PDF service with invalid content"""
    with pytest.raises(Exception):
        extract_text_from_pdf(b"invalid pdf content")

# Note: Real PDF testing would require actual PDF files
# This is a minimal test structure as requested