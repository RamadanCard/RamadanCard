// الانتقال من صفحة 1 إلى صفحة 2
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const employeeName = document.getElementById("employeeName");

// زر الحفظ و canvas
const saveBtn = document.getElementById("saveBtn");
const canvas = document.getElementById("canvas");
const img = document.querySelector(".greeting-img");

nameForm.addEventListener("submit", function(e){
  e.preventDefault();
  const name = nameInput.value.trim();
  if(name === "") return;

  // إضافة الاسم على الصفحة الثانية
  employeeName.textContent = name;

  // الانتقال للصفحة الثانية
  page1.classList.remove("active");
  page2.classList.add("active");
});

saveBtn.addEventListener("click", function () {
  const original = new Image();
  original.src = img.src;

  original.onload = function () {
    canvas.width = original.naturalWidth;
    canvas.height = original.naturalHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(original, 0, 0);

    ctx.font = "70px Arial";
    ctx.fillStyle = "#046c50";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const x = (140 * canvas.width) / img.width;
    const y = (345 * canvas.height) / img.height;

    ctx.fillText(employeeName.textContent, x, y);

    const link = document.createElement("a");
    link.download = "ramadan_HD.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
});