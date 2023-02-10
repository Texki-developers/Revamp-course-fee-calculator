import React, { useEffect, useState } from "react";
import optionsList from "../../JSONDB/optionsList";
import "./CalculatorPage.scss";
import SubjectHourWrapper from "./SubjectHourWrapper";
import CoursePlan from "../clipboard/Clipboard";

const getNextMarch = (inputDate = new Date()) => {
  let date = new Date(inputDate);
  let year = date.getFullYear();
  let march31st = new Date(year, 2, 31);

  if (date < march31st) {
    return march31st;
  } else {
    return new Date(year + 1, 2, 31);
  }
};

const CalculatorPage = () => {
  const [classType, setClassType] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [classesPerWeek, setClassesPerWeek] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const [classSchedule, setClassSchedule] = useState(false);
  const [sellingprice, setSellingprice] = useState(0);
  const [parentaldetails, setParentalDetails] = useState({});
  const [suggestedPrices,setSuggestedPrices] = useState()
  const [err, setErr] = useState("");
  let date = new Date();
  date.setDate(date.getDate() + 1);
  let Tomorrow = new Date(date);

  const [form, setForm] = useState({
    type: "1:6",
    syllabus: "CBSE",
    startDate: Tomorrow,
    endDate: getNextMarch(),
    totalSubjects: 3,
    classesPerWeek: [],
  });

  const handleChange = (e) => {
    if (e.target.name === "totalSubjects") {
      setForm({
        ...form,
        [e.target.name]: parseInt(e.target.value),
        classesPerWeek: [],
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setSyllabus("CBSE");
  }, []);

  useEffect(() => {
    let coursePricePerHour = 0;
    if (form.classType === "1:1") {
      coursePricePerHour = 750;
    } else if (form.type === "1:6") {
      if (
        form.syllabus === "ICSE" ||
        form.syllabus === "CBSE" ||
        form.syllabus === "State"
      ) {
        coursePricePerHour = 350;
      } else {
        setErr(
          "1:6 class type is not available for IGCSE, GCSE, and Others syllabuses"
        );
        return;
      }
    }

    const numWeeks =
      (form.endDate - form.startDate) / (7 * 24 * 60 * 60 * 1000);
    let totalClasses = 0;
    form.classesPerWeek.forEach((i) => {
      totalClasses = totalClasses + Number(i.dValue);
    });
    console.log(totalClasses, "totalclass");
    const totalHours = numWeeks * totalClasses;

    const price = totalHours * coursePricePerHour;

    // console.log(form.totalSubjects, "weee");
    setTotalPrice(Math.round(price));
    setSuggestedPrices(Math.round(price * 1.2))
    console.log("rerendering");
    setError("");
  }, [form]);

  console.log(form);  
  const suggestedPrice = (e) => {
    let sPrice = Math.round(totalPrice * 1.2);

    if (sPrice < e.target.value) {
      setErr("");
    } else {
  
      setErr("Your selling Price should be greater than Suggested Price");
    }
    setSellingprice(e.target.value);
  };
  //   console.log(form);

  const handleUserDetails = (e) => {
    e.preventDefault();
    setParentalDetails({...parentaldetails,
      [e.target.name]: e.target.value,
    });
    console.log(parentaldetails);
  };
  

  return (
    <div className="home-page-container">
      <form onSubmit={handleSubmit} className="calculate-form">
        <h2 className="form-title">Revamp course fee calculator</h2>
        <div className="user_wrapper">
          <div className="input-wrapper-parental">
            <label className="label-title">Sales</label>
            <input
              type="radio"
              className="input-field"
              value={0} 
              onChange={handleUserDetails}
              name="user"
            />
          </div>
          <div className="input-wrapper-parental">
            <label className="label-title">Franchise</label>
            <input
              type="radio"
              className="input-field"
              value={1}
              onChange={handleUserDetails}
              name="user"
            />
          </div>
        </div>
        <div className="input-wrapper">
          <label className="label-title">Parent Name</label>
          <input
            type="text"
            className="input-field"
            value={parentaldetails?.ParentName}
            onChange={handleUserDetails}
            name="ParentName"
          />
        </div>
        <div className="input-wrapper">
          <label className="label-title">Child Name</label>
          <input
            type="text"
            className="input-field"
            value={parentaldetails?.ChildName}
            onChange={handleUserDetails}
            name="ChildName"
          />
        </div>
        {syllabus === "ICSE" || syllabus === "CBSE" || syllabus === "State" ? (
          <div className="input-wrapper">
            <label className="label-title">Class Type:</label>
            <select className="input-field" onChange={handleChange} name="type">
              <option value="1:6">1:6</option>
              <option value="1:1">1:1</option>
            </select>
          </div>
        ) : null}
        <div className="input-wrapper">
          <label className="label-title">Syllabus:</label>
          <select
            className="input-field"
            onChange={(e) => setSyllabus(e.target.value)}
          >
            {optionsList &&
              optionsList.syllabus.map((item, i) => (
                <option key={i + 1} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
        <div className="input-wrapper">
          <label className="label-title">Start Date:</label>
          <input
            type="date"
            className="input-field"
            value={Tomorrow.toISOString().substr(0, 10)}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label className="label-title">End Date:</label>
          <input
            type="date"
            className="input-field"
            value={form.endDate.toISOString().substr(0, 10)}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label className="label-title">Total number of subjects</label>
          <input
            type="number"
            min={0}
            className="input-field"
            value={form.totalSubjects}
            onChange={handleChange}
            name="totalSubjects"
          />
        </div>
        <div className="input-wrapper">
          <label className="label-title">Classes per Week:</label>
          {form.totalSubjects &&
            [...Array(form.totalSubjects)].map((item, index) => (
              <SubjectHourWrapper
                keyIndex={index > 6 ? 6 : index}
                formAction={setForm}
                formData={form}
                schedule={setClassSchedule}
              />
            ))}
        </div>

        <ul className="results-wrapper">
          <li className="results">
            Minimum Price: ₹ {totalPrice}
          </li>
          <li className="results">
            Suggested Price: ₹ {Math.round(totalPrice * 1.2)}
          </li>
          <div className="input-wrapper">
            <label className="label-title">Your Selling price</label>
            <input
              type="number"
              className="input-field"
              value={sellingprice}
              onChange={suggestedPrice}
              name="suggestedPrice"
            />
          </div>
          {err ? <p>{err}</p> : ""}
          <li className="results">Incentive at minimum price: {Math.round(totalPrice * 0.09)}</li>
          <li className="results">Incentive at suggested price: {Math.round(suggestedPrices * 0.09 )}</li>
          <li className="results">Incentive at your Selling price:  {Math.round(totalPrice * 1.2)< sellingprice ? parentaldetails.user == "1" ? Math.round(sellingprice * 0.2): Math.round(sellingprice * 7 / 100): '0'}</li>
        </ul>
      </form>
      <CoursePlan parents={parentaldetails} price={sellingprice || Math.round(totalPrice)} data={form} />
    </div>
  );
};

export default CalculatorPage;
