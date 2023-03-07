import React, { useState, useEffect } from "react";

const CoursePlan = ({ price, data, week, pid }) => {
  const [showToast, setShowToast] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Hi ${data.ParentName},
Customized course plan for ${data.ChildName}:
${data.classesPerWeek.map((i) => {
  return `${i.subject} : ${i.dValue}  classes/week`;
})}
Maths:  classes / week
Chemistry: 3 classes / week
Course duration:${week} weeks
${data.syllabus} syllabus
Personalized attention in small group classes (max 6 students)
Price: ₹ ${price}
We're committed to helping ${data.ChildName} achieve academic success`
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const handleCopyClick = () => {
    navigator.clipboard.writeText(pid);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div style={{ padding: "20px", textAlign: "left" }}>
      <div style={{ fontSize: "16px" }}>
        Hi {data.ParentName},
        <br />
        Customized course plan for {data.ChildName}:
        <br />
        <br />
        {data.classesPerWeek &&
          data.classesPerWeek.map((i) => (
            <>
              {i.subject} : {i.dValue} classes / week
              <br />{" "}
            </>
          ))}
        Course duration: {week} weeks
        <br />
        {data.syllabus} syllabus
        <br />
        {data.type == "1:1"
          ? "Personalized attention in 1:1 "
          : "Personalized attention in small group classes (max 6 students)"}
        <br />
        Price: ₹ {price}
        <br />
        We're committed to helping {data.ChildName} achieve academic success
      </div>
      <br />
      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleCopy}
      >
        Copy to Clipboard
      </button>
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "lightgreen",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Copied to Clipboard
        </div>
      )}

      <div
        style={{
          backgroundColor: "#000",
          padding: "10px",
          marginTop: "2rem",
          width: "29%",
        }}
      >
        <pre
          style={{
            backgroundColor: "transparent",
            border: "none",
            padding: 0,
            color: "#ffff",
            fontWeight: 700,
            margin: 0,
            fontSize: "1.2rem",
          }}
        >
          {pid}
        </pre>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <button
            style={{
              backgroundColor: "#f2f2f2",
              border: "1px solid #000",
              padding: "5px 10px",
              fontSize: "14px",
            }}
            onClick={handleCopyClick}
          >
            {isCopied ? "Copied!" : "Copy Product ID"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePlan;
