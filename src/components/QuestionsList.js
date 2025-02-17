import React, { useState, useEffect } from "react";
import Link from "next/link";

function QuestionsList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/questions");
        const data = await response.json();
        setQuestions(data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "var(--text_color)",
          textAlign: "center",
        }}
      >
        Questions List
      </h2>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {questions.map((question) => (
          <li key={question._id} style={{ marginBottom: "10px" }}>
            <Link
              href={`/questions/${question._id}`}
              style={{ textDecoration: "none", color: "#0070f3" }}
            >
              {question.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionsList;
