import os
import sys
import json
import base64
import requests

HF_TOKEN = os.getenv("HF_TOKEN")
if not HF_TOKEN:
    print(json.dumps({"success": False, "error": "Missing HF_TOKEN environment variable"}))
    sys.exit(1)

MODEL = "valhalla/distilbart-mnli-12-1"
API_URL = f"https://api-inference.huggingface.co/models/{MODEL}"
HEADERS = {"Authorization": f"Bearer {HF_TOKEN}"}

DEFAULT_CATEGORIES = ["Electricity", "Panchayat", "Police", "Health", "Education", "Transport", "Highways", "General"]
SEVERITY_LEVELS = ["High", "Medium", "Low"]

def call_hf_api(text, labels):
    payload = {"inputs": text, "parameters": {"candidate_labels": labels}}
    response = requests.post(API_URL, headers=HEADERS, json=payload, timeout=30)

    if response.status_code != 200:
        raise RuntimeError(f"Hugging Face API error: {response.status_code} - {response.text}")

    return response.json()

def classify_petition(text, categories=None, need_department=False):
    if categories is None:
        categories = DEFAULT_CATEGORIES

    if need_department:
        category_result = call_hf_api(text, categories)
        category_label = category_result["labels"][0]
    else:
        category_label = None

    severity_result = call_hf_api(text, SEVERITY_LEVELS)
    severity_label = severity_result["labels"][0]

    result = {"severity": severity_label}
    if need_department:
        result["label"] = category_label
        result["department"] = category_label

    return result

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({
            "success": False,
            "error": "Missing required argument. Usage: python classifier.py <base64_encoded_json>"
        }))
        sys.exit(1)

    try:
        base64_input = sys.argv[1]
        json_string = base64.b64decode(base64_input).decode("utf-8")
        data = json.loads(json_string)

        categories = data.get("categories", DEFAULT_CATEGORIES)
        query = data.get("query", "")
        need_department = data.get("need_department", False)

        if not query:
            print(json.dumps({"success": False, "error": "No query provided in the input"}))
            sys.exit(1)

        result = classify_petition(query, categories, need_department)
        print(json.dumps({"success": True, "result": result}))

    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)
