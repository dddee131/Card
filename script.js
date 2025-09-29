// متغيرات عامة
let backgroundImageData = null;

// تحديث المعاينة في الوقت الفعلي
function updatePreview() {
const title = document.getElementById(‘invitationTitle’).value || ‘دعوة زواج’;
const brideName = document.getElementById(‘brideName’).value || ‘العروس’;
const groomName = document.getElementById(‘groomName’).value || ‘العريس’;
const date = document.getElementById(‘weddingDate’).value.replace(/\n/g, ‘<br>’) || ‘تاريخ الزفاف’;
const venue = document.getElementById(‘venueInfo’).value.replace(/\n/g, ‘<br>’) || ‘معلومات المكان’;
const additional = document.getElementById(‘additionalText’).value || ‘’;
const textColor = document.getElementById(‘textColor’).value;
const fontFamily = document.getElementById(‘fontFamily’).value;
const textStyle = document.getElementById(‘textStyle’).value;
const shadowType = document.getElementById(‘shadowType’).value;
const shadowIntensity = document.getElementById(‘shadowIntensity’).value;
const coupleNamesFont = document.getElementById(‘coupleNamesFont’).value;

```
document.getElementById('displayTitle').textContent = title;
document.getElementById('displayNames').textContent = `${brideName} & ${groomName}`;
document.getElementById('displayDate').innerHTML = date;
document.getElementById('displayVenue').innerHTML = venue;
document.getElementById('displayAdditional').textContent = additional;

// تطبيق نوع الخط
const content = document.getElementById('cardContent');
content.style.fontFamily = `"${fontFamily}", sans-serif`;

// تطبيق خط خاص لأسماء العروسين
const namesElement = document.getElementById('displayNames');
if (coupleNamesFont === 'same') {
    namesElement.style.fontFamily = `"${fontFamily}", sans-serif`;
} else {
    namesElement.style.fontFamily = `"${coupleNamesFont}", sans-serif`;
}

// إزالة جميع أنماط النص السابقة
content.classList.remove(
    'text-style-gold', 
    'text-style-silver', 
    'text-style-rose-gold', 
    'text-style-bronze', 
    'text-style-gradient-gold', 
    'text-style-gradient-silver', 
    'text-style-gradient-rainbow',
    'text-style-3d-gold',
    'text-style-3d-silver',
    'text-style-neon-gold',
    'text-style-neon-silver'
);

// تطبيق نمط النص
if (textStyle === 'normal') {
    content.style.color = textColor;
} else {
    content.classList.add('text-style-' + textStyle);
    content.style.color = '';
}

// تطبيق نوع الظل
content.classList.remove('shadow-outer', 'shadow-inner', 'shadow-both', 'shadow-none');
content.classList.add('shadow-' + shadowType);

// تطبيق شدة الظل
updateShadowIntensity(shadowType, shadowIntensity);

// تحديث القيمة المعروضة
document.getElementById('shadowIntensityValue').textContent = shadowIntensity;

// تطبيق الخلفية حسب النوع
updateBackground();
```

}

// تحديث شدة الظل
function updateShadowIntensity(shadowType, intensity) {
const content = document.getElementById(‘cardContent’);
const elements = content.querySelectorAll(’.invitation-title, .couple-names, .wedding-date, .venue-info, .additional-text’);

```
const alpha = intensity / 10;

elements.forEach(element => {
    if (shadowType === 'outer') {
        element.style.textShadow = `${intensity}px ${intensity}px ${intensity * 2}px rgba(0,0,0,${alpha * 0.5})`;
    } else if (shadowType === 'inner') {
        element.style.textShadow = `inset ${intensity}px ${intensity}px ${intensity * 2}px rgba(0,0,0,${alpha * 0.7})`;
        element.style.filter = 'brightness(0.9)';
    } else if (shadowType === 'both') {
        element.style.textShadow = `${intensity}px ${intensity}px ${intensity * 2}px rgba(0,0,0,${alpha * 0.4}), inset -${intensity}px -${intensity}px ${intensity * 2}px rgba(0,0,0,${alpha * 0.3})`;
    } else {
        element.style.textShadow = 'none';
        element.style.filter = 'none';
    }
});
```

}

// تحديث الخلفية
function updateBackground() {
const card = document.getElementById(‘invitationCard’);
const overlay = document.getElementById(‘cardOverlay’);
const backgroundType = document.getElementById(‘backgroundType’).value;

```
if (backgroundType === 'gradient') {
    const cardColor = document.getElementById('cardColor').value;
    card.style.backgroundImage = `linear-gradient(135deg, ${cardColor}, ${adjustColor(cardColor, -20)})`;
    overlay.style.display = 'none';
} else if (backgroundType === 'image' && backgroundImageData) {
    card.style.backgroundImage = `url(${backgroundImageData})`;
    const overlayOpacity = document.getElementById('overlayOpacity').value;
    overlay.style.display = 'block';
    overlay.style.background = `rgba(0,0,0,${overlayOpacity / 100})`;
}
```

}

// التحكم في عرض الحقول حسب نوع الخلفية
function toggleBackgroundControls() {
const backgroundType = document.getElementById(‘backgroundType’).value;
const colorGroup = document.getElementById(‘colorGroup’);
const imageGroup = document.getElementById(‘imageGroup’);
const overlayGroup = document.getElementById(‘overlayGroup’);

```
if (backgroundType === 'gradient') {
    colorGroup.style.display = 'block';
    imageGroup.style.display = 'none';
    overlayGroup.style.display = 'none';
} else {
    colorGroup.style.display = 'none';
    imageGroup.style.display = 'block';
    overlayGroup.style.display = 'block';
}
updateBackground();
```

}

// معالجة رفع الصورة
function handleImageUpload(event) {
const file = event.target.files[0];
if (file) {
const reader = new FileReader();
reader.onload = function(e) {
backgroundImageData = e.target.result;
updateBackground();
};
reader.readAsDataURL(file);
}
}

// تحديث اتجاه البطاقة
function updateCardOrientation() {
const orientation = document.getElementById(‘cardOrientation’).value;
const card = document.getElementById(‘invitationCard’);

```
// إزالة جميع فئات الاتجاه السابقة
card.classList.remove('card-portrait', 'card-landscape', 'card-story', 'card-square', 'card-postcard');

// إضافة الفئة الجديدة
card.classList.add(`card-${orientation}`);

// تحديث أحجام النصوص حسب الاتجاه
updateTextSizes(orientation);
```

}

// تحديث أحجام النصوص حسب اتجاه البطاقة
function updateTextSizes(orientation) {
const title = document.getElementById(‘displayTitle’);
const names = document.getElementById(‘displayNames’);
const date = document.getElementById(‘displayDate’);
const venue = document.getElementById(‘displayVenue’);
const additional = document.getElementById(‘displayAdditional’);

```
// أحجام النصوص لكل اتجاه
const sizes = {
    portrait: {
        title: '32px',
        names: '48px',
        date: '16px',
        venue: '16px',
        additional: '16px'
    },
    landscape: {
        title: '28px',
        names: '42px',
        date: '16px',
        venue: '16px',
        additional: '14px'
    },
    story: {
        title: '24px',
        names: '36px',
        date: '14px',
        venue: '14px',
        additional: '12px'
    },
    square: {
        title: '30px',
        names: '44px',
        date: '16px',
        venue: '16px',
        additional: '15px'
    },
    postcard: {
        title: '26px',
        names: '38px',
        date: '16px',
        venue: '16px',
        additional: '13px'
    }
};

const currentSizes = sizes[orientation];
title.style.fontSize = currentSizes.title;
names.style.fontSize = currentSizes.names;
date.style.fontSize = currentSizes.date;
venue.style.fontSize = currentSizes.venue;
additional.style.fontSize = currentSizes.additional;
```

}

// تحديث الإطار
function updateFrame() {
const frame = document.getElementById(‘decorativeFrame’);
const frameColor = document.getElementById(‘frameColor’).value;
const frameOpacity = document.getElementById(‘frameOpacity’).value / 100;
const frameMargin = document.getElementById(‘frameMargin’).value;
const showFrame = document.getElementById(‘showFrame’).value;

```
// تحديث قيم الشفافية والهوامش المعروضة
document.getElementById('frameOpacityValue').textContent = document.getElementById('frameOpacity').value;
document.getElementById('frameMarginValue').textContent = frameMargin;

// إزالة جميع فئات الإطار
frame.classList.remove('frame-hidden', 'frame-outer-only', 'frame-inner-only');

// تطبيق فئة الإطار المناسبة
switch(showFrame) {
    case 'none':
        frame.classList.add('frame-hidden');
        break;
    case 'outer':
        frame.classList.add('frame-outer-only');
        break;
    case 'inner':
        frame.classList.add('frame-inner-only');
        break;
}

// تطبيق الهوامش
frame.style.top = frameMargin + 'px';
frame.style.left = frameMargin + 'px';
frame.style.right = frameMargin + 'px';
frame.style.bottom = frameMargin + 'px';

// تحويل لون hex إلى rgb
const r = parseInt(frameColor.slice(1, 3), 16);
const g = parseInt(frameColor.slice(3, 5), 16);
const b = parseInt(frameColor.slice(5, 7), 16);

// تطبيق اللون والشفافية
frame.style.borderColor = `rgba(${r}, ${g}, ${b}, ${frameOpacity})`;

// تطبيق اللون على الإطار الداخلي عبر CSS custom property
const style = document.createElement('style');
style.textContent = `
    .decorative-frame::before {
        border-color: rgba(${r}, ${g}, ${b}, ${frameOpacity * 0.6}) !important;
    }
`;

// إزالة النمط السابق إذا كان موجوداً
const oldStyle = document.getElementById('dynamic-frame-style');
if (oldStyle) oldStyle.remove();

style.id = 'dynamic-frame-style';
document.head.appendChild(style);
```

}

// دالة لتعديل اللون
function adjustColor(color, amount) {
const usePound = color[0] === ‘#’;
const col = usePound ? color.slice(1) : color;
const num = parseInt(col, 16);
let r = (num >> 16) + amount;
let g = (num >> 8 & 0x00FF) + amount;
let b = (num & 0x0000FF) + amount;
r = r > 255 ? 255 : r < 0 ? 0 : r;
g = g > 255 ? 255 : g < 0 ? 0 : g;
b = b > 255 ? 255 : b < 0 ? 0 : b;
return (usePound ? ‘#’ : ‘’) + (r << 16 | g << 8 | b).toString(16).padStart(6, ‘0’);
}

// معاينة بملء الشاشة
function previewFullscreen() {
const card = document.getElementById(‘invitationCard’).cloneNode(true);
const fullscreenDiv = document.createElement(‘div’);
fullscreenDiv.style.cssText = `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; z-index: 1000; cursor: pointer;`;

```
card.style.cssText += 'transform: scale(0.8); cursor: default;';

fullscreenDiv.appendChild(card);
document.body.appendChild(fullscreenDiv);

fullscreenDiv.addEventListener('click', function(e) {
    if (e.target === fullscreenDiv) {
        document.body.removeChild(fullscreenDiv);
    }
});
```

}

// تحميل الدعوة كصورة
function downloadInvitation() {
const card = document.getElementById(‘invitationCard’);
const orientation = document.getElementById(‘cardOrientation’).value;

```
// استخدام html2canvas لحفظ الصورة مع التنسيق الصحيح
if (typeof html2canvas === 'undefined') {
    // تحميل مكتبة html2canvas إذا لم تكن موجودة
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = function() {
        captureCardImage(card, orientation);
    };
    document.head.appendChild(script);
} else {
    captureCardImage(card, orientation);
}
```

}

// التقاط صورة البطاقة
function captureCardImage(card, orientation) {
const options = {
allowTaint: true,
useCORS: true,
backgroundColor: null,
scale: 2,
logging: false,
onclone: function(clonedDoc) {
const clonedCard = clonedDoc.getElementById(‘invitationCard’);
if (clonedCard) {
clonedCard.style.transform = ‘none’;
clonedCard.style.boxShadow = ‘none’;
}
}
};

```
html2canvas(card, options).then(canvas => {
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wedding-invitation-${orientation}-${new Date().getTime()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 'image/png', 1.0);
}).catch(function(error) {
    console.error('حدث خطأ أثناء حفظ الصورة:', error);
    downloadWithCanvas(orientation);
});
```

}

// مشاركة البطاقة عبر واتساب
async function shareWhatsApp() {
const card = document.getElementById(‘invitationCard’);
const orientation = document.getElementById(‘cardOrientation’).value;
const brideName = document.getElementById(‘brideName’).value || ‘العروس’;
const groomName = document.getElementById(‘groomName’).value || ‘العريس’;

```
// تحميل مكتبة jsPDF إذا لم تكن موجودة
if (typeof jspdf === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// تحميل html2canvas إذا لم تكن موجودة
if (typeof html2canvas === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// التقاط البطاقة كصورة
const options = {
    allowTaint: true,
    useCORS: true,
    backgroundColor: null,
    scale: 2,
    logging: false,
    onclone: function(clonedDoc) {
        const clonedCard = clonedDoc.getElementById('invitationCard');
        if (clonedCard) {
            clonedCard.style.transform = 'none';
            clonedCard.style.boxShadow = 'none';
        }
    }
};

try {
    const canvas = await html2canvas(card, options);
    
    // تحويل Canvas إلى Blob
    canvas.toBlob(async function(blob) {
        // للأجهزة المحمولة التي تدعم Web Share API
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'invitation.png', { type: 'image/png' })] })) {
            const file = new File([blob], `دعوة-زواج-${brideName}-${groomName}.png`, { type: 'image/png' });
            const shareData = {
                title: `دعوة زواج ${brideName} & ${groomName}`,
                text: `يشرفنا حضوركم لحفل زفاف ${brideName} & ${groomName}`,
                files: [file]
            };
            
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('تم إلغاء المشاركة');
            }
        } else {
            // للأجهزة التي لا تدعم Web Share API
            // تحويل الصورة إلى base64
            const reader = new FileReader();
            reader.onloadend = function() {
                const base64data = reader.result;
                
                // رسالة واتساب
                const message = encodeURIComponent(`🎊 دعوة زواج 🎊\n\n${brideName} & ${groomName}\n\nيشرفنا حضوركم`);
                
                // فتح واتساب مع الرسالة
                const whatsappUrl = `https://wa.me/?text=${message}`;
                window.open(whatsappUrl, '_blank');
                
                // تحميل الصورة للمشاركة يدوياً
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = `دعوة-زواج-${brideName}-${groomName}.png`;
                downloadLink.click();
                
                alert('تم فتح واتساب وتحميل الصورة. الرجاء إرفاق الصورة المحملة مع الرسالة في واتساب.');
            };
            reader.readAsDataURL(blob);
        }
    }, 'image/png', 1.0);
    
} catch (error) {
    console.error('حدث خطأ أثناء المشاركة:', error);
    alert('عذراً، حدث خطأ أثناء المشاركة. الرجاء المحاولة مرة أخرى.');
}
```

}

// طريقة بديلة للحفظ باستخدام Canvas
function downloadWithCanvas(orientation) {
const dimensions = {
portrait: { width: 1200, height: 1600 },
landscape: { width: 1600, height: 1200 },
story: { width: 1080, height: 1920 },
square: { width: 1200, height: 1200 },
postcard: { width: 1400, height: 900 }
};

```
const dim = dimensions[orientation];
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = dim.width;
canvas.height = dim.height;

const backgroundType = document.getElementById('backgroundType').value;

if (backgroundType === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const cardColor = document.getElementById('cardColor').value;
    gradient.addColorStop(0, cardColor);
    gradient.addColorStop(1, adjustColor(cardColor, -20));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTextContent(ctx, orientation);
} else if (backgroundType === 'image' && backgroundImageData) {
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const overlayOpacity = document.getElementById('overlayOpacity').value;
        ctx.fillStyle = `rgba(0,0,0,${overlayOpacity / 100})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawTextContent(ctx, orientation);
        downloadCanvas(canvas, orientation);
    };
    img.src = backgroundImageData;
    return;
}

drawTextContent(ctx, orientation);
downloadCanvas(canvas, orientation);
```

}

// رسم النصوص على الكانفاس
function drawTextContent(ctx, orientation) {
const canvasWidth = ctx.canvas.width;
const canvasHeight = ctx.canvas.height;

```
// رسم الإطار الزخرفي
const showFrame = document.getElementById('showFrame').value;
const frameColor = document.getElementById('frameColor').value;
const frameOpacity = document.getElementById('frameOpacity').value / 100;
const frameMargin = document.getElementById('frameMargin').value;

if (showFrame !== 'none') {
    const r = parseInt(frameColor.slice(1, 3), 16);
    const g = parseInt(frameColor.slice(3, 5), 16);
    const b = parseInt(frameColor.slice(5, 7), 16);
    const canvasMargin = frameMargin * (canvasWidth / 600);
    
    if (showFrame === 'both' || showFrame === 'outer') {
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${frameOpacity})`;
        ctx.lineWidth = 6;
        ctx.strokeRect(canvasMargin, canvasMargin, canvasWidth - (canvasMargin * 2), canvasHeight - (canvasMargin * 2));
    }
    
    if (showFrame === 'both' || showFrame === 'inner') {
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${frameOpacity * 0.6})`;
        ctx.lineWidth = 2;
        const innerMargin = canvasMargin + 30;
        ctx.strokeRect(innerMargin, innerMargin, canvasWidth - (innerMargin * 2), canvasHeight - (innerMargin * 2));
    }
}

// أحجام النصوص
const fontSizes = {
    portrait: { title: 64, names: 96, date: 40, venue: 32, additional: 32 },
    landscape: { title: 56, names: 84, date: 36, venue: 28, additional: 26 },
    story: { title: 48, names: 72, date: 32, venue: 24, additional: 24 },
    square: { title: 60, names: 88, date: 38, venue: 30, additional: 30 },
    postcard: { title: 52, names: 76, date: 34, venue: 26, additional: 24 }
};

const sizes = fontSizes[orientation];
const textColor = document.getElementById('textColor').value;
const fontFamily = document.getElementById('fontFamily').value;

ctx.fillStyle = textColor;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
ctx.shadowBlur = 4;
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;

const canvasFontFamily = getImprovedFontForCanvas(fontFamily);
const centerX = canvasWidth / 2;
let currentY = canvasHeight * 0.25;
const spacing = orientation === 'story' ? canvasHeight * 0.08 : canvasHeight * 0.1;

// العنوان
ctx.font = `bold ${sizes.title}px ${canvasFontFamily}`;
ctx.fillText(document.getElementById('displayTitle').textContent, centerX, currentY);
currentY += spacing;

// أسماء العروسين
ctx.font = `300 ${sizes.names}px ${canvasFontFamily}`;
ctx.fillText(document.getElementById('displayNames').textContent, centerX, currentY);
currentY += spacing * 0.8;

// التصميم الجديد للتاريخ والمكان جنباً إلى جنب
const dateVenueY = currentY + spacing * 0.5;
const leftX = canvasWidth * 0.25;
const rightX = canvasWidth * 0.75;

// رسم التاريخ (يسار) - دعم أسطر متعددة
ctx.font = `${sizes.date}px ${canvasFontFamily}`;
const dateLines = document.getElementById('weddingDate').value.split('\n');
let dateY = dateVenueY - (dateLines.length - 1) * sizes.date * 0.7;
dateLines.forEach(line => {
    if (line.trim()) {
        ctx.fillText(line, leftX, dateY);
        dateY += sizes.date * 1.4;
    }
});

// رسم الخط الفاصل
const separatorX = canvasWidth / 2;
const separatorHeight = 80 * (canvasWidth / 600);
ctx.fillStyle = `rgba(255, 255, 255, 0.5)`;
ctx.fillRect(separatorX - 1, dateVenueY - separatorHeight / 2, 2, separatorHeight);

// رسم الرمز الزخرفي
ctx.font = `${sizes.date * 0.6}px ${canvasFontFamily}`;
ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
ctx.fillText('♦', separatorX, dateVenueY);

// رسم معلومات المكان (يمين)
ctx.font = `${sizes.venue}px ${canvasFontFamily}`;
ctx.fillStyle = textColor;
const venueLines = document.getElementById('venueInfo').value.split('\n');
let venueY = dateVenueY - (venueLines.length - 1) * sizes.venue * 0.7;
venueLines.forEach(line => {
    if (line.trim()) {
        ctx.fillText(line, rightX, venueY);
        venueY += sizes.venue * 1.4;
    }
});

// النص الإضافي
if (document.getElementById('displayAdditional').textContent.trim()) {
    ctx.font = `italic ${sizes.additional}px ${canvasFontFamily}`;
    ctx.fillText(document.getElementById('displayAdditional').textContent, centerX, dateVenueY + spacing * 1.5);
}
```

}

// تحويل اسم الخط للاستخدام في الكانفاس
function getImprovedFontForCanvas(fontFamily) {
const fontMap = {
‘Segoe UI’: ‘“Segoe UI”, “Segoe UI Arabic”, “Dubai”, “Tahoma”, Arial, sans-serif’,
‘Arial’: ‘Arial, “Arial Unicode MS”, “Tahoma”, sans-serif’,
‘Times New Roman’: ‘“Times New Roman”, “Traditional Arabic”, “Arabic Typesetting”, serif’,
‘Georgia’: ‘Georgia, “Times New Roman”, serif’,
‘Trebuchet MS’: ‘“Trebuchet MS”, “Segoe UI”, sans-serif’,
‘Palatino Linotype’: ‘“Palatino Linotype”, “Book Antiqua”, serif’,
‘Book Antiqua’: ‘“Book Antiqua”, “Palatino Linotype”, serif’,
‘Garamond’: ‘Garamond, “Times New Roman”, serif’,
‘Verdana’: ‘Verdana, “Segoe UI”, sans-serif’,
‘Tahoma’: ‘Tahoma, “Segoe UI”, “Dubai”, sans-serif’,
‘Cairo’: ‘“Segoe UI”, “Dubai”, “Tahoma”, Arial, sans-serif’,
‘Amiri’: ‘“Traditional Arabic”, “Arabic Typesetting”, “Times New Roman”, serif’,
‘Noto Sans Arabic’: ‘“Segoe UI”, “Dubai”, “Tahoma”, Arial, sans-serif’,
‘IBM Plex Sans Arabic’: ‘“Segoe UI”, “Calibri”, “Dubai”, Arial, sans-serif’
};

```
return fontMap[fontFamily] || '"Segoe UI", Arial, sans-serif';
```

}

// تحميل الكانفاس كصورة
function downloadCanvas(canvas, orientation) {
canvas.toBlob(function(blob) {
const url = URL.createObjectURL(blob);
const a = document.createElement(‘a’);
a.href = url;
a.download = `wedding-invitation-${orientation}-${new Date().getTime()}.png`;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
});
}

// طباعة الدعوة
function printInvitation() {
const card = document.getElementById(‘invitationCard’).cloneNode(true);
const printWindow = window.open(’’, ‘_blank’);
printWindow.document.write(`<!DOCTYPE html> <html lang="ar" dir="rtl"> <head> <meta charset="UTF-8"> <title>طباعة دعوة الزواج</title> <style> @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@300;400;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;600;700&display=swap'); * { margin: 0; padding: 0; box-sizing: border-box; } body { margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f0f0f0; } .print-card { transform: scale(1); box-shadow: none; } @media print { body { background: white; padding: 0; } .print-card { width: 100% !important; height: auto !important; max-width: none !important; transform: none !important; } } .invitation-card { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 20px; position: relative; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.2); margin: 0 auto; background-size: cover; background-position: center; background-repeat: no-repeat; transition: all 0.3s ease; } .card-portrait { width: 600px; height: 800px; } .card-landscape { width: 800px; height: 600px; } .card-story { width: 400px; height: 700px; } .card-square { width: 600px; height: 600px; } .card-postcard { width: 700px; height: 450px; } .card-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1; display: none; } .card-content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 60px 40px; color: white; } .decorative-frame { position: absolute; top: 30px; left: 30px; right: 30px; bottom: 30px; border: 3px solid rgba(255,255,255,0.3); border-radius: 15px; transition: all 0.3s ease; z-index: 3; pointer-events: none; } .decorative-frame::before { content: ''; position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px; border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; transition: all 0.3s ease; } .frame-hidden { display: none; } .frame-outer-only::before { display: none; } .frame-inner-only { border: none; } .invitation-title { font-size: 32px; font-weight: bold; margin-bottom: 30px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); } .couple-names { font-size: 48px; font-weight: 300; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); letter-spacing: 2px; } .date-venue-container { display: flex; align-items: center; justify-content: center; margin: 30px 0; gap: 30px; width: 100%; flex-wrap: wrap; } .wedding-date { font-size: 24px; opacity: 0.9; text-align: center; flex: 1; min-width: 200px; } .venue-info { font-size: 18px; line-height: 1.6; opacity: 0.9; text-align: center; flex: 1; min-width: 200px; } .separator { width: 2px; height: 80px; background: rgba(255, 255, 255, 0.5); border-radius: 1px; position: relative; } .separator::before { content: '♦'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 255, 255, 0.9); padding: 10px; border-radius: 50%; font-size: 12px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; } .additional-text { font-size: 16px; line-height: 1.5; opacity: 0.8; font-style: italic; margin-top: 30px; } .card-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hearts" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M10,6 C10,6 4,0 0,6 C0,12 10,20 10,20 C10,20 20,12 20,6 C16,0 10,6 10,6 Z" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23hearts)"/></svg>') repeat; opacity: 0.3; z-index: 0; } </style> </head> <body> <div class="print-card">${card.outerHTML}</div> </body> </html>`);

```
printWindow.document.close();
printWindow.onload = function() {
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
};
```

}

// إضافة مستمعين للأحداث
document.querySelectorAll(‘input, textarea, select’).forEach(element => {
if (element.id === ‘cardOrientation’) {
element.addEventListener(‘change’, updateCardOrientation);
} else if (element.id === ‘backgroundType’) {
element.addEventListener(‘change’, toggleBackgroundControls);
} else if (element.id === ‘backgroundImage’) {
element.addEventListener(‘change’, handleImageUpload);
} else if (element.id === ‘frameColor’ || element.id === ‘frameOpacity’ || element.id === ‘frameMargin’ || element.id === ‘showFrame’) {
element.addEventListener(element.type === ‘range’ ? ‘input’ : ‘change’, updateFrame);
} else if (element.id === ‘fontFamily’ || element.id === ‘textStyle’ || element.id === ‘shadowType’ || element.id === ‘coupleNamesFont’) {
element.addEventListener(‘change’, updatePreview);
} else if (element.id === ‘shadowIntensity’) {
element.addEventListener(‘input’, updatePreview);
} else {
element.addEventListener(‘input’, updatePreview);
}
});

// تحديث المعاينة عند تحميل الصفحة
document.addEventListener(‘DOMContentLoaded’, function() {
updatePreview();
toggleBackgroundControls();
updateCardOrientation();
updateFrame();
});