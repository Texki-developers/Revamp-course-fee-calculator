import React, { useState } from 'react'

export default function SalesCalculator() {
  const [coursePrice,setCoursePrice] = useState('')
  const processCode = (event) => {
    setCoursePrice(calculateCoursePrice(event.target.value))
  }


  function calculateCoursePrice(courseCode) {
    const type = courseCode.charAt(0);
    const weeks = parseInt(courseCode.substr(1, 2));
    const subjects = courseCode.substr(3);

    let pricePerHour = 0;
    if (type === 'O') {
      pricePerHour = 750;
    } else if (type === 'S') {
      pricePerHour = 300;
    } else {
      throw new Error('Invalid course type');
      
    }

    let totalPrice = 0;
    for (let i = 0; i < subjects.length; i += 3) {
      const subject = subjects.substr(i, 2);
      const hours = parseInt(subjects.charAt(i + 2));
      totalPrice += hours * pricePerHour;
    }

    return totalPrice * weeks;
  }

  return (
    <div className="home-page-container">
      <form className="calculate-form">
        <h1 className="form-title">Revamp course price calculator</h1>
        <label htmlFor="main" className="input-wrapper">
          <span className="label-title">Product Code</span>
          <input type="text" onChange={processCode} name="main" min={0} id="main" className="input-field" />
        </label>
        <ul className="results-wrapper">
          <li className="results">Course Price: {coursePrice} </li>
        </ul>
      </form>
    </div>
  )
}
