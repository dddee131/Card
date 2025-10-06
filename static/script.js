const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const preview = document.getElementById('preview');
const result = document.getElementById('result');
const status = document.getElementById('status');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) preview.src = URL.createObjectURL(file);
});

uploadBtn.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!file) { status.textContent = 'اختر صورة أولاً'; return; }
  status.textContent = 'جارٍ إزالة الخلفية...';

  const fd = new FormData();
  fd.append('file', file);

  try {
    const res = await fetch('/remove', { method: 'POST', body: fd });
    if (!res.ok) throw new Error('فشل في معالجة الصورة');
    const blob = await res.blob();
    result.src = URL.createObjectURL(blob);
    status.textContent = 'تمت الإزالة ✅';
  } catch (err) {
    status.textContent = 'حدث خطأ: ' + err.message;
  }
});