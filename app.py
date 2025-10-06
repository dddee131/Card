from flask import Flask, render_template, request, send_file, jsonify
from rembg import remove
import io, os
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
        return jsonify({"error": "لم يتم اختيار ملف"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "الملف غير صالح"}), 400

    input_bytes = file.read()
    try:
        output_bytes = remove(input_bytes)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    filename = f"result_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}.png"
    path = os.path.join(RESULTS_FOLDER, filename)
    with open(path, "wb") as f:
        f.write(output_bytes)

    return send_file(path, mimetype="image/png", as_attachment=False)

if __name__ == "__main__":
    app.run(debug=True)