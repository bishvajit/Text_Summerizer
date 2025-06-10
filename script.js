const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
const API_TOKEN = " Use your own API Key";

async function summarizeText() {
  const inputText = document.getElementById("inputText").value;
  const summaryDiv = document.getElementById("summary");

  summaryDiv.innerText = "Summarizing...";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: inputText })
  });

  if (!response.ok) {
    summaryDiv.innerText = "Error: Could not summarize text.";
    return;
  }

  const data = await response.json();
  if (data && data[0] && data[0].summary_text) {
    summaryDiv.innerText = data[0].summary_text;
  } else {
    summaryDiv.innerText = "No summary generated.";
  }
}

async function extractAndSummarizePDF() {
  const fileInput = document.getElementById("pdfFile");
  const file = fileInput.files[0];
  if (!file) return alert("Please upload a PDF file.");

  const reader = new FileReader();
  reader.onload = async function () {
    const typedarray = new Uint8Array(this.result);

    const pdf = await pdfjsLib.getDocument(typedarray).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      fullText += strings.join(" ") + "\n";
    }

    document.getElementById("inputText").value = fullText;
    summarizeText();
  };

  reader.readAsArrayBuffer(file);
}
