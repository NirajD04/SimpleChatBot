import { useState } from "react";
import axios from "axios";

function App() {
  const [quesation, setquesation] = useState("");
  const [answer, setanswer] = useState("");

  async function generateResponse() {

    setanswer("Generating response...");
    

    const response = await axios({
      method: "post",
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDAyoDaRwrBniVIHqzEBrc88_dBug-doc8",
      data: {
        contents: [
          {
            parts: [{ text: quesation }],
          },
        ],
      },
    });

    setanswer(response.data.candidates[0]?.content?.parts[0]?.text || "No response.");
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-200 via-purple-100 to-pink-100 p-4">

    <h1 className="text-5xl font-bold text-center text-indigo-700 py-6 bg-white shadow-lg rounded-lg">
      Simple AI ChatBot
    </h1>
    
    <div className="flex flex-col items-center justify-center mt-8">
      <textarea
        className="w-full max-w-2xl h-40 p-4 rounded-lg border-2 border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
        placeholder="Enter your question here"
        value={quesation}
        onChange={(e) => setquesation(e.target.value)}
      ></textarea>
      <button
        className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-transform transform hover:-translate-y-1"
        onClick={generateResponse}
      >
        Generate
      </button><pre className="w-full max-w-2xl mt-6 p-4 bg-white text-gray-800 rounded-lg shadow-md border border-gray-300 break-words whitespace-pre-wrap">
  {answer}
</pre>

    </div>
  </div>
  

  );
}

export default App;
