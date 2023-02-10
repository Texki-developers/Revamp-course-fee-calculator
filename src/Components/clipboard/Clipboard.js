import React, { useEffect } from "react";

const CoursePlan = ({ parents, price, data }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Hi ${parents.ParentName},
Customized course plan for ${parents.ChildName}:

Maths: 2 classes/week
Chemistry: 3 classes/week
Course duration: 5 months
${data.syllabus} syllabus
Personalized attention in small group classes (max 6 students)
Price: ₹ ${price}
We're committed to helping ${parents.ChildName} achieve academic success`
    );
  };

  useEffect(() => {
    console.log(data.type, "triggering");
  }, [data, price, parents]);

  return (
    <div style={{ padding: "20px", textAlign: "left" }}>
      <div style={{ fontSize: "16px" }}>
        Hi {parents.ParentName},
        <br />
        Customized course plan for {parents.ChildName}:
        <br />
        <br />
        Maths: 2 classes/week
        <br />
        Chemistry: 3 classes/week
        <br />
        Course duration: 5 months
        <br />
        {data.syllabus} syllabus
        <br />
        {data.type == "1:1"
          ? "Personalized attention in 1:1 "
          : "Personalized attention in small group classes (max 6 students)"}
        <br />
        Price: ₹ {price}
        <br />
        We're committed to helping {parents.ChildName} achieve academic success
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
    </div>
  );
};

export default CoursePlan;
