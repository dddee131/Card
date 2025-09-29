// متغيرات عامة
let backgroundImageData = null;

// تحديث المعاينة في الوقت الفعلي
function updatePreview() {
const title = document.getElementById(‘invitationTitle’).value || ‘دعوة زواج’;
const brideName = document.getElementById(‘brideName’).value || ‘العروس’;
const groomName = document.getElementById(‘groomName’).value || ‘العريس’;
const dateText = document.getElementById(‘weddingDate’).value || ‘تاريخ الزفاف’;
const venueText = document.getElementById(‘venueInfo’).value || ‘معلومات المكان’;
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

// تحويل النص مع الحفاظ على الأسطر الجديدة فقط
const dateLines = dateText.split('\n').filter(line => line.trim() !== '');
document.getElementById('displayDate').innerHTML = dateLines.join('<br>');

const venueLines = venueText.split('\n').filter(line => line.trim() !== '');
document.getElementById('displayVenue').innerHTML = venueLines.join('<br>');

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

// إزالة أنماط الظل
content.classList.remove('shadow-outer', 'shadow-inner', 'shadow-both', 'shadow-none');

// تطبيق نمط النص أولاً
if (textStyle === 'normal') {
    content.style.color = textColor;
    // إزالة الفلاتر
    const elements = content.querySelectorAll('.invitation-title, .couple-names, .wedding-date, .venue-info, .additional-text');
    elements.forEach(el => {
        el.style.background = '';
        el.style.webkitBackgroundClip = '';
        el.style.webkitTextFillColor = '';
        el.style.backgroundClip = '';
        el.style.color = textColor;
    });
} else {
    content.classList.add('text-style-' + textStyle);
    content.style.color = '';
}

// ثم تطبيق الظل
content.classList.add('shadow-' + shadowType);
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
const alpha = Math.min(intensity / 10, 0.9);
const blur = intensity * 2;

elements.forEach(element => {
    if (shadowType === 'outer') {
        element.style.filter = `drop-shadow(${intensity}px ${intensity}px ${blur}px rgba(0,0,0,${alpha * 0.5}))`;
    } else if (shadowType === 'inner') {
        element.style.filter = `drop-shadow(inset ${intensity}px ${intensity}px ${blur}px rgba(0,0,0,${alpha * 0.7}))`;
    } else if (shadowType === 'both') {
        element.style.filter = `drop-shadow(${intensity}px ${intensity}px ${blur}px rgba(0,0,0,${alpha * 0.4})) drop-shadow(inset -${intensity}px -${intensity}px ${blur}px rgba(0,0,0,${alpha * 0.3}))`;
    } else {
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
// استخدام html2canvas لحفظ الصورة
if (typeof html2canvas === 'undefined') {
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
    console.error('حدث خطأ:', error);
    alert('عذراً، حدث خطأ أثناء حفظ الصورة');
});
```

}

// مشاركة واتساب
async function shareWhatsApp() {
const card = document.getElementById(‘invitationCard’);
const brideName = document.getElementById(‘brideName’).value || ‘العروس’;
const groomName = document.getElementById(‘groomName’).value || ‘العريس’;

```
if (typeof html2canvas === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

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
    
    canvas.toBlob(async function(blob) {
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
            const message = encodeURIComponent(`دعوة زواج\n\n${brideName} & ${groomName}\n\nيشرفنا حضوركم`);
            const whatsappUrl = `https://wa.me/?text=${message}`;
            window.open(whatsappUrl, '_blank');
            
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `دعوة-زواج-${brideName}-${groomName}.png`;
            downloadLink.click();
            
            alert('تم فتح واتساب وتحميل الصورة. الرجاء إرفاق الصورة المحملة مع الرسالة.');
        }
    }, 'image/png', 1.0);
    
} catch (error) {
    console.error('خطأ:', error);
    alert('عذراً، حدث خطأ أثناء المشاركة');
}
```

}

// طباعة الدعوة
function printInvitation() {
const card = document.getElementById(‘invitationCard’).cloneNode(true);
const printWindow = window.open(’’, ‘_blank’);
printWindow.document.write(`<!DOCTYPE html> <html lang="ar" dir="rtl"> <head> <meta charset="UTF-8"> <title>طباعة دعوة الزواج</title> <style> @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Aref+Ruqaa:wght@400;700&family=Aref+Ruqaa+Ink:wght@400;700&family=Katibeh&family=Rakkas&family=Scheherazade+New:wght@400;700&family=Amiri:wght@400;700&family=Reem+Kufi:wght@400;600;700&family=Mirza:wght@400;600;700&family=Harmattan:wght@400;700&family=Mada:wght@400;600;700&family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap'); * { margin: 0; padding: 0; box-sizing: border-box; } body { margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f0f0f0; } .invitation-card { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 20px; position: relative; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.2); margin: 0 auto; background-size: cover; background-position: center; } .card-portrait { width: 600px; height: 800px; } .card-landscape { width: 800px; height: 600px; } .card-story { width: 400px; height: 700px; } .card-square { width: 600px; height: 600px; } .card-postcard { width: 700px; height: 450px; } .card-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; display: none; } .card-content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 60px 40px; color: white; } .decorative-frame { position: absolute; top: 30px; left: 30px; right: 30px; bottom: 30px; border: 3px solid rgba(255,255,255,0.3); border-radius: 15px; z-index: 3; pointer-events: none; } .decorative-frame::before { content: ''; position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px; border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; } .invitation-title { font-size: 32px; font-weight: bold; margin-bottom: 30px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); } .couple-names { font-size: 48px; font-weight: 300; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); letter-spacing: 2px; } .date-venue-container { display: flex; align-items: center; justify-content: center; margin: 30px 0; gap: 15px; width: 100%; } .wedding-date { font-size: 16px; opacity: 0.9; text-align: center; flex: 1; min-width: 120px; } .venue-info { font-size: 16px; line-height: 1.6; opacity: 0.9; text-align: center; flex: 1; min-width: 120px; } .separator { width: 2px; height: 60px; background: rgba(255, 255, 255, 0.5); border-radius: 1px; flex-shrink: 0; } .additional-text { font-size: 16px; line-height: 1.5; opacity: 0.8; font-style: italic; margin-top: 30px; } @media print { body { background: white; padding: 0; } } </style> </head> <body>${card.outerHTML}</body> </html>`);

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