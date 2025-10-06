document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const originalPreview = document.getElementById('originalPreview');
    const resultPreview = document.getElementById('resultPreview');
    const removeBgBtn = document.getElementById('removeBgBtn');
    const resetBtn = document.getElementById('resetBtn');
    const loading = document.getElementById('loading');
    const resultSection = document.getElementById('resultSection');
    const downloadBtn = document.getElementById('downloadBtn');
    
    let currentFile = null;
    let currentImageId = null;
    
    // التعامل مع سحب وإفلات الملفات
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = 'rgba(106, 17, 203, 0.15)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.backgroundColor = 'rgba(106, 17, 203, 0.05)';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = 'rgba(106, 17, 203, 0.05)';
        
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    
    // النقر على منطقة الرفع
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // اختيار ملف من خلال زر الرفع
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });
    
    // زر إزالة الخلفية
    removeBgBtn.addEventListener('click', removeBackground);
    
    // زر إعادة التعيين
    resetBtn.addEventListener('click', resetApp);
    
    // زر التحميل
    downloadBtn.addEventListener('click', downloadImage);
    
    // معالجة الملف المرفوع
    function handleFile(file) {
        // التحقق من نوع الملف
        if (!file.type.match('image.*')) {
            alert('الرجاء اختيار ملف صورة فقط (JPG, PNG, WEBP)');
            return;
        }
        
        // التحقق من حجم الملف (5MB كحد أقصى)
        if (file.size > 5 * 1024 * 1024) {
            alert('حجم الملف كبير جداً. الحد الأقصى المسموح به هو 5MB');
            return;
        }
        
        currentFile = file;
        
        // عرض المعاينة
        const reader = new FileReader();
        reader.onload = (e) => {
            originalPreview.src = e.target.result;
            removeBgBtn.disabled = false;
        };
        reader.readAsDataURL(file);
        
        // إعادة تعيين النتيجة السابقة
        resultPreview.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cud3cub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjNmMyIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7Yp9mE2LnYsdio2Ycg2KfZhNmF2KfYr9in2Kog2KfZhNiv2YbYr9mF2YrYqTwvdGV4dD48L3N2Zz4=";
        resultSection.style.display = 'none';
        
        // تنظيف الصورة السابقة إذا كانت موجودة
        if (currentImageId) {
            cleanupPreviousImage();
        }
    }
    
    // إزالة الخلفية
    async function removeBackground() {
        if (!currentFile) return;
        
        loading.style.display = 'block';
        removeBgBtn.disabled = true;
        
        try {
            const formData = new FormData();
            formData.append('image', currentFile);
            
            const response = await fetch('/remove-background', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                currentImageId = result.image_id;
                
                // عرض الصورة الناتجة
                const downloadUrl = `/download/${currentImageId}?t=${new Date().getTime()}`;
                resultPreview.src = downloadUrl;
                resultSection.style.display = 'block';
            } else {
                alert(result.error || 'حدث خطأ أثناء معالجة الصورة');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ في الاتصال بالخادم');
        } finally {
            loading.style.display = 'none';
            removeBgBtn.disabled = false;
        }
    }
    
    // إعادة تعيين التطبيق
    function resetApp() {
        fileInput.value = '';
        originalPreview.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjNmMyIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7Yp9mE2YTYqSDYp9mE2KfZhjwvdGV4dD48L3N2Zz4=";
        resultPreview.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cud3cub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjNmMyIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7Yp9mE2LnYsdio2Ycg2KfZhNmF2KfYr9in2Kog2KfZhNiv2YbYr9mF2YrYqTwvdGV4dD48L3N2Zz4=";
        resultSection.style.display = 'none';
        removeBgBtn.disabled = true;
        currentFile = null;
        
        // تنظيف الصورة السابقة
        if (currentImageId) {
            cleanupPreviousImage();
            currentImageId = null;
        }
    }
    
    // تحميل الصورة
    function downloadImage() {
        if (!currentImageId) return;
        
        const downloadUrl = `/download/${currentImageId}`;
        window.location.href = downloadUrl;
    }
    
    // تنظيف الصورة السابقة من الخادم
    async function cleanupPreviousImage() {
        if (!currentImageId) return;
        
        try {
            await fetch('/cleanup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image_id: currentImageId })
            });
        } catch (error) {
            console.error('Cleanup error:', error);
        }
    }
    
    // تنظيف الملفات عند مغادرة الصفحة
    window.addEventListener('beforeunload', () => {
        if (currentImageId) {
            cleanupPreviousImage();
        }
    });
});