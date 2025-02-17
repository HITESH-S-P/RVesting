import React from "react";
import { useState } from "react";
import QuestionsList from "../components/QuestionsList";
import SubmitAnswer from "../components/SubmitAnswer";
import Link from "next/link";
import { useRouter } from "next/router";
import InnerHeader from "../components/InnerHeader";
import { color } from "framer-motion";

function DiscussionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { questionId } = router.query;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const question = { title, description };

    try {
      const response = await fetch("http://localhost:5001/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      });

      if (response.ok) {
        alert("Question submitted successfully!");
        setTitle("");
        setDescription("");
      } else {
        const errorData = await response.json();
        alert(`Failed to submit question: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error in submitting question", error);
      alert("Failed to submit question: Network error");
    }
    window.location.reload();
  };

  return (
    <>
      <InnerHeader />
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          padding: "150px",
        }}
      >
        {!questionId && (
          <div
            style={{
              border: "1px solid var(--text_color)",
              borderRadius: "10px",
              padding: "100px",
              width: "600px",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                color: "var(--text_color)",
                textAlign: "center",
              }}
            >
              Submit a Question
            </h2>
            <div className="card" style={{ marginBottom: "20px" }}>
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter title"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    borderRadius: "5px",
                    border: "1px solid var(--text_color)",
                    backgroundColor: "var(--bg_color)",
                  }}
                />
              </div>
              <div>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter description"
                  style={{
                    width: "100%",
                    height: "100px",
                    padding: "10px",
                    marginBottom: "20px",
                    borderRadius: "5px",
                    border: "1px solid var(--text_color)",
                    backgroundColor: "var(--bg_color)",
                  }}
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                style={{
                  width: "100%",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  border: "2px solid #0070f3",
                  backgroundColor: "var(--bg_color)",
                  color: "#0070f3",
                  cursor: "pointer",
                  marginBottom: "40px",
                }}
              >
                Submit Question
              </button>
            </div>
            <QuestionsList />
          </div>
        )}
        {questionId && <SubmitAnswer />}
      </div>
    </>
  );
}

export default DiscussionPage;
