import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function SubmitAnswer() {
  const router = useRouter();
  const { questionId } = router.query;
  const [question, setQuestion] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/questions/${questionId}`
        );
        const data = await response.json();
        setQuestion(data.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    if (questionId) {
      fetchQuestion();
    }
  }, [questionId]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5001/api/answers/${questionId}/answers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );

      if (response.ok) {
        alert("Answer submitted successfully!");
        setContent("");
      } else {
        const errorData = await response.json();
        alert(`Failed to submit answer: ${errorData.message}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error in submitting answer:", error);
      alert("Failed to submit answer: Network error");
    }
  };

  return (
    <div
      style={{
        width: "400px",
        maxWidth: "800px",
        margin: "0px auto",
        padding: "20px",
        border: "1px solid var(--text_color)",
        color: "var(--text_color)",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Submit an Answer
      </h2>
      {question && (
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Title: {question.title}
          </h3>
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Decription: {question.description}
          </p>
          <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
            Answers:
          </h4>
          <ul>
            {question.answers.map((answer) => (
              <li
                key={answer._id}
                style={{
                  marginBottom: "30px",
                  textAlign: "center",
                  listStyleType: "none",
                }}
              >
                {answer.content}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Enter your answer"
          required
          style={{
            width: "100%",
            height: "100px",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid var(--text_color)",
            backgroundColor: "var(--bg_color)",
          }}
        ></textarea>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "2px solid #0070f3",
            backgroundColor: "var(--bg_color)",
            color: "#0070f3",
            cursor: "pointer",
          }}
        >
          Submit Answer
        </button>
      </form>
    </div>
  );
}

export default SubmitAnswer;
