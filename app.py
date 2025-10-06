from flask import Flask, render_template, request, send_file, jsonify
from rembg import remove
from PIL import Image
import io
import os
from datetime import datetime

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
RESULTS_FOLDER = "results"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/remove", methods=["POST"])
def remove_bg():
    if 'file' not in request.files:
        return jsonify({"error": "no file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "no selected file"}), 400

    # Read image bytes
    input_bytes = file.read()
    try:
        # rembg.remove accepts bytes or PIL Image
        output_bytes = remove(input_bytes)
    except Exception as e:
        return jsonify({"error": "processing failed", "details": str(e)}), 500

    # Save output to a PNG file (with alpha)
    out_filename = f"result_{datetime.utcnow().strftime('%Y%m%d%H%M%S%f')}.png"
    out_path = os.path.join(RESULTS_FOLDER, out_filename)
    with open(out_path, "wb") as f:
        f.write(output_bytes)

    return send_file(out_path, mimetype="image/png", as_attachment=True, download_name=out_filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)