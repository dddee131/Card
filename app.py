from flask import Flask, render_template, request, send_file, jsonify
from rembg import remove
from PIL import Image
import io
import os
import uuid
from datetime import datetime

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5MB limit

# مجلد التخزين المؤقت
UPLOAD_FOLDER = 'temp_uploads'
OUTPUT_FOLDER = 'temp_output'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/remove-background', methods=['POST'])
def remove_background():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'لم يتم تقديم صورة'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'لم يتم اختيار ملف'}), 400
        
        # التحقق من نوع الملف
        if not file.content_type.startswith('image/'):
            return jsonify({'error': 'الرجاء اختيار ملف صورة فقط'}), 400
        
        # إنشاء اسم فريد للملف
        file_id = str(uuid.uuid4())
        input_path = os.path.join(UPLOAD_FOLDER, f"{file_id}_input.png")
        output_path = os.path.join(OUTPUT_FOLDER, f"{file_id}_output.png")
        
        # حفظ الملف المؤقت
        input_image = Image.open(file.stream)
        input_image.save(input_path, 'PNG')
        
        # إزالة الخلفية
        output_image = remove(input_image)
        
        # حفظ الصورة الناتجة
        output_image.save(output_path, 'PNG')
        
        # تحويل الصورة الناتجة إلى base64 للعرض
        img_io = io.BytesIO()
        output_image.save(img_io, 'PNG')
        img_io.seek(0)
        
        return jsonify({
            'success': True,
            'image_id': file_id,
            'message': 'تم إزالة الخلفية بنجاح'
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': f'حدث خطأ: {str(e)}'}), 500

@app.route('/download/<image_id>')
def download_image(image_id):
    try:
        output_path = os.path.join(OUTPUT_FOLDER, f"{image_id}_output.png")
        
        if not os.path.exists(output_path):
            return jsonify({'error': 'الصورة غير موجودة'}), 404
            
        return send_file(output_path, as_attachment=True, download_name='صورة_بدون_خلفية.png')
        
    except Exception as e:
        return jsonify({'error': f'حدث خطأ أثناء التحميل: {str(e)}'}), 500

@app.route('/cleanup', methods=['POST'])
def cleanup():
    """تنظيف الملفات المؤقتة"""
    try:
        data = request.get_json()
        image_id = data.get('image_id')
        
        if image_id:
            input_path = os.path.join(UPLOAD_FOLDER, f"{image_id}_input.png")
            output_path = os.path.join(OUTPUT_FOLDER, f"{image_id}_output.png")
            
            # حذف الملفات إذا كانت موجودة
            if os.path.exists(input_path):
                os.remove(input_path)
            if os.path.exists(output_path):
                os.remove(output_path)
        
        return jsonify({'success': True})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# تنظيف الملفات القديمة تلقائياً (يمكن تفعيله لاحقاً)
def cleanup_old_files():
    """حذف الملفات الأقدم من ساعة"""
    try:
        current_time = datetime.now()
        for folder in [UPLOAD_FOLDER, OUTPUT_FOLDER]:
            for filename in os.listdir(folder):
                file_path = os.path.join(folder, filename)
                file_time = datetime.fromtimestamp(os.path.getctime(file_path))
                if (current_time - file_time).total_seconds() > 3600:  # ساعة واحدة
                    os.remove(file_path)
    except Exception as e:
        print(f"Cleanup error: {e}")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)