const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const status = document.getElementById('status');
const preview = document.getElementById('preview');
const resultImg = document.getElementById('result');

fileInput.addEventListener('change', () => {
  const f = fileInput.files[0];
  if (!f) return;
  preview.src = URL.createObjectURL(f);
  resultImg.src = '';
});

uploadBtn.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!file) { status.textContent = 'اختر صورة أولاً'; return; }
  status.textContent = 'جارٍ المعالجة...';
  const fd = new FormData();
  fd.append('file', file);
  try {
    const resp = await fetch('/remove', { method: 'POST', body: fd });
    if (!resp.ok) {
      const err = await resp.json().catch(()=>({error:'unknown'}));
      status.textContent = 'خطأ: ' + (err.error || resp.statusText);
      return;
    }
    // نحصل على blob ونضعه في العنصر img للعرض
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    resultImg.src = url;
    status.textContent = 'تمت المعالجة — اضغط على الصورة بالزر الأيمن لحفظها';
  } catch (e) {
    status.textContent = 'فشل الاتصال بالخادم: ' + e.message;
  }
});