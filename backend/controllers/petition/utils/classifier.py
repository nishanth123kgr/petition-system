# classify.py
import os
import sys
import json
import base64

# Set environment variables to suppress CUDA device messages
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "max_split_size_mb:512"
os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["TRANSFORMERS_VERBOSITY"] = "error"

# Import transformers after setting environment variables
from transformers import pipeline

classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

DEFAULT_CATEGORIES = ["Electricity", "Panchayat", "Police", "Health", "Education", "Transport", "Highways", "General"]
SEVERITY_LEVELS = ["High", "Medium", "Low"]

def classify_petition(text, categories=None, need_department=False):
    if categories is None:
        categories = DEFAULT_CATEGORIES
    
    # Classify the petition category
    if need_department:
        category_result = classifier(text, categories)
    
    # Classify the severity level
    severity_result = classifier(
        text,
        SEVERITY_LEVELS
    )
    
    # Return severity classifications and department if needed
    if need_department:
        return {
            "label": category_result["labels"][0],
            "severity": severity_result["labels"][0],
            "department": category_result["labels"][0]
        }
    # If department is not needed, return only severity

    return {
        "severity": severity_result["labels"][0]
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        # Return error in JSON format
        error_response = {
            "success": False,
            "error": "Missing required argument. Usage: python classifier.py <base64_encoded_json>"
        }
        print(json.dumps(error_response))
        sys.exit(1)
        
    try:
        # Decode the base64 input
        base64_input = sys.argv[1]
        json_string = base64.b64decode(base64_input).decode('utf-8')
        
        # Parse the JSON
        data = json.loads(json_string)
        
        # Extract categories and query
        categories = data.get('categories', DEFAULT_CATEGORIES)
        query = data.get('query', '')
        need_department = data.get('need_department', False)
        
        if not query:
            error_response = {
                "success": False,
                "error": "No query provided in the input"
            }
            print(json.dumps(error_response))
            sys.exit(1)
            
        # Classify the petition
        result = classify_petition(query, categories, need_department)
        
        # Return success response with classification results
        success_response = {
            "success": True,
            "result": result
        }
        print(json.dumps(success_response))
    except Exception as e:
        # Return any other errors in JSON format
        error_response = {
            "success": False,
            "error": str(e)
        }
        print(json.dumps(error_response))
        sys.exit(1)
