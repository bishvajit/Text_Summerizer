const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
const API_TOKEN = "Add your on API Key "; 

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
