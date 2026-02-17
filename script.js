// العناصر
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const employeeName = document.getElementById("employeeName");

const saveBtn = document.getElementById("saveBtn");
const canvas = document.getElementById("canvas");
const img = document.querySelector(".greeting-img");

// عند إدخال الاسم والانتقال للصفحة الثانية
nameForm.addEventListener("submit", function(e){
  e.preventDefault();
  const name = nameInput.value.trim();
  if(name === "") return;

  employeeName.textContent = name; // الاسم يظهر في الصفحة الثانية
  page1.classList.remove("active");
  page2.classList.add("active");
});

// حفظ الصورة مع الاسم
saveBtn.addEventListener("click", async function(){

  if (!img.complete) {
    alert("الصورة لم تتحمل بعد");
    return;
  }

  // الانتظار حتى يتم تحميل الخط PingARLT
  await document.fonts.load("12px PingARLT");
  await document.fonts.ready;

  // canvas بنفس حجم الصورة الطبيعي
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");

  // رسم الصورة
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // إعداد الخط PingARLT بحجم 12px
  ctx.font = "12px PingARLT";
  ctx.fillStyle = "#046c50";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

 // نحسب مكان الاسم من نفس مكانه اللي على الصفحة
const rectText = employeeName.getBoundingClientRect();
const rectImg  = img.getBoundingClientRect();

// سكيل بين عرض الصورة على الصفحة وبين حجمها الحقيقي وقت الحفظ
const scaleX = img.naturalWidth  / rectImg.width;
const scaleY = img.naturalHeight / rectImg.height;

// مركز الاسم داخل الصورة (نفس مكانه تمامًا)
const x = (rectText.left - rectImg.left + rectText.width / 2) * scaleX;
const y = (rectText.top  - rectImg.top  + rectText.height / 2) * scaleY;

// نخلي حجم الخط يكبر مع دقة الصورة (كان 12px على الصفحة)
const fontSize = 12 * scaleX;
ctx.font = ${fontSize}px PingARLT;

ctx.fillText(employeeName.textContent, x, y);
  // تحميل الصورة
  const link = document.createElement("a");
  link.download = "ramadan_with_name.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
