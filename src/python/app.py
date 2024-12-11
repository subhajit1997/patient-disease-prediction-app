from flask import Flask, request, jsonify
from flask_cors import CORS
from analyze import analyze_patient_info
import json

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.json
        print("Received data:", data)  # Debugging

        # Validate recentTests field
        if not isinstance(data.get("recentTests"), list):
            raise ValueError("recentTests must be a list.")
        
        for test in data["recentTests"]:
            if not isinstance(test, dict) or "description" not in test:
                raise ValueError("Each test in recentTests must have a 'description' key.")

        response_data = analyze_patient_info(
            data["age"],
            data["gender"],
            data["bmi"],
            data["habits"],
            data["medicalHistory"],
            data["familyHistory"],
            data["previousDiagnoses"],
            data["currentSymptoms"],
            data["recentTests"],
            data["clinicalNotes"],
            data["otherInfo"]
        )
        cleared_response_data = response_data.strip('```json').strip('```').strip()
        json_format = json.loads(cleared_response_data)
        
        print("python_response:"+cleared_response_data)
        return cleared_response_data

    except KeyError as e:
        return {"error": f"Missing key: {str(e)}"}, 400

    except ValueError as e:
        return {"error": str(e)}, 400

    except Exception as e:
        print("Internal Server Error:", str(e))  # Log full error
        return {"error": str(e)}, 500


if __name__ == "__main__":
    app.run(debug=True)