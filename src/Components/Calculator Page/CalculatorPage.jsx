import React, { useEffect, useState } from "react";
import optionsList from "../../JSONDB/optionsList";
import "./CalculatorPage.scss";
import SubjectHourWrapper from "./SubjectHourWrapper";
import CoursePlan from "../clipboard/Clipboard";

const getNextMarch = (inputDate = new Date()) => {
  let date = new Date(inputDate);
  let year = date.getFullYear();
  let march31st = new Date(year+1, 2, 31);

  if (date < march31st) {
    return march31st;
  } else {
    return new Date(year + 1, 2, 31);
  }
};

const CalculatorPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const [productId,setProductID] = useState()
  const [classSchedule, setClassSchedule] = useState(false);
  const [sellingprice, setSellingprice] = useState(0);
  const [suggestedPrices, setSuggestedPrices] = useState();
  const [err, setErr] = useState("");
  
  const [weeks, setWeeks] = useState(0);
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
    user: 0,
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
  console.log(form);
  useEffect(() => {
    let coursePricePerHour = 0;
    if (form.type === "1:1") {
      coursePricePerHour = 750;
    } else if (form.type === "1:6") {
      if (
        form.syllabus === "ICSE" ||
        form.syllabus === "CBSE" ||
        form.syllabus === "State"
      ) {
        coursePricePerHour = 300;
      } else {
        return;
      }
    }

    const numWeeks =
      (new Date(form.endDate) - new Date(form.startDate)) /
      (7 * 24 * 60 * 60 * 1000);
    console.log(numWeeks, "NUMBER OF WEEKS");
    let totalClasses = 0;
    let mt = 0
    let sc = 0
    let ss = 0
    let hd =0
    let ab = 0
    let en = 0
    let ot = 0
    form.classesPerWeek.forEach((i) => {
      totalClasses = totalClasses + Number(i.dValue);
        switch (i.subject) {
          case "Maths":
          case "MT":
            mt = i.dValue;
            break;
          case "Science":
          case "SC":
            sc = i.dValue;
            break;
          case "Social Science":
          case "SS":
            ss = i.dValue;
            break;
          case "Hindi":
          case "HD":
            hd = i.dValue;
            break;
          case "Arabic":
          case "AB":
            ab = i.dValue;
            break;
          case "English":
          case "EN":
            en = i.dValue;
            break;
          case "Others":
          case "OT":
            ot = i.dValue;
            break;
        }
    });
    console.log(mt,"met bnro")

    setProductID(`${Math.round(numWeeks)}${mt ? `MT${mt}` : ''}${sc ? `SC${sc}` : ''}${ss ? `SS${ss}` : ''}${hd ? `HD${hd}` : ''}${ab ? `AB${ab}` : ''}${en ? `EN${en}` : ''}`)
    setWeeks(numWeeks);
    const totalHours = Math.round(numWeeks) * totalClasses;
    const price = totalHours * coursePricePerHour;

    setTotalPrice(Math.round(price));
    setSuggestedPrices(Math.round(price * 1.2));
    setError("");
  }, [form]);

  const suggestedPrice = (e) => {
    let sPrice = Math.round(totalPrice * 1.2);

    if (sPrice < e.target.value) {
      setErr("");
    } else {
      setErr("Your selling Price should be greater than Suggested Price");
    }
    setSellingprice(e.target.value);
  };



  return (
    <div className="home-page-container">
      <form className="calculate-form">
        <h2 className="form-title">Revamp course fee calculator</h2>

        <div className="input-wrapper">
          <label className="label-title">Parent Name</label>
          <input
            type="text"
            className="input-field"
            value={form?.ParentName}
            onChange={handleChange}
            name="ParentName"
          />
        </div>
        <div className="input-wrapper">
          <label className="label-title">Child Name</label>
          <input
            type="text"
            className="input-field"
            value={form?.ChildName}
            onChange={handleChange}
            name="ChildName"
          />
        </div>
        {form.syllabus === "ICSE" ||
        form.syllabus === "CBSE" ||
        form.syllabus === "State" ? (
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
            name="syllabus"
            onChange={handleChange}
          >
            {optionsList &&
              optionsList.syllabus.map((item, i) => (
                <option name="syllabus" key={i + 1} value={item}>
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
            value={new Date(form?.startDate).toISOString().substr(0, 10)}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
        </div>
        <div className="input-wrapper">
          <label className="label-title">End Date:</label>
          <input
            type="date"
            className="input-field"
            value={new Date(form?.endDate).toISOString().substr(0, 10)}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
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
          <li className="results">Minimum Price: ₹ {totalPrice}</li>
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
          <li className="results">
            Incentive at minimum price: {Math.round(totalPrice * 0.09)}
          </li>
          <li className="results">
            Incentive at suggested price: {Math.round(suggestedPrices * 0.09)}
          </li>
          <li className="results">
            Incentive at your Selling price:{" "}
            {Math.round(totalPrice * 1.2) < sellingprice
              ? form.user == "1"
                ? Math.round(sellingprice * 0.2)
                : Math.round((sellingprice * 7) / 100)
              : "0"}
          </li>
        </ul>
      </form>
  
      <CoursePlan
        price={sellingprice || Math.round(totalPrice)}
        data={form}
        week={Math.round(weeks)}
        pid={productId}
      />
   
    </div>
  );
};

export default CalculatorPage;
