fetch("http://localhost:8000/run", {
  method: "POST",
  body: formData
})
async function runOMR() {
  const examName = document.getElementById("examName").value;
  const fileInput = document.getElementById("pdfFile");
  const status = document.getElementById("status");

  if (!examName || fileInput.files.length === 0) {
    alert("Please enter exam name and upload PDF");
    return;
  }

  status.innerText = "Uploading and starting correction...";

  const formData = new FormData();
  formData.append("exam_id", examName);
  formData.append("file", fileInput.files[0]);

  try {
    const response = await fetch("http://localhost:8000/exam/run", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    status.innerText = "Job started. Job ID: " + data.job_id;

  } catch (err) {
    status.innerText = "Error connecting to backend";
    console.error(err);
  }
}
