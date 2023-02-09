import React, { useState } from "react";
import './CalculatorPage.scss'
import SubjectHourWrapper from "./SubjectHourWrapper";

const getNextMarch = () => {
    return '31-03-2023'
}

const CalculatorPage = () => {
    const [classType, setClassType] = useState("");
    const [syllabus, setSyllabus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [classesPerWeek, setClassesPerWeek] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState("");
    const [form,setForm] = useState({type:'1:6',syllabus: 'ICSE', startDate: new Date().setDate(new Date().getDate() + 1), endDate: getNextMarch(), totalSubjects: 3, classesPerWeek: []})

    const handleChange = e => {
        if(e.target.name === 'totalSubjects'){
            setForm({...form,[e.target.name]: parseInt(e.target.value)})
        }else{
            setForm({...form,[e.target.name]: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let coursePricePerHour = 0;
        if (classType === "1:1") {
            coursePricePerHour = 750;
        } else if (classType === "1:6") {
            if (syllabus === "ICSE" || syllabus === "CBSE" || syllabus === "State") {
                coursePricePerHour = 350;
            } else {
                setError("1:6 class type is not available for IGCSE, GCSE, and Others syllabuses");
                return;
            }
        }
        const numWeeks = (new Date(endDate) - new Date(startDate)) / (7 * 24 * 60 * 60 * 1000);
        const totalHours = numWeeks * classesPerWeek;
        const price = totalHours * coursePricePerHour;
        setTotalPrice(price);
        setError("");
    };

    return (
        <div className="home-page-container">
            <form onSubmit={handleSubmit} className="calculate-form">
                <h2 className="form-title">Revamp course fee calculator</h2>
                <div className="input-wrapper">
                    <label className="label-title">Class Type:</label>
                    <select className="input-field"  onChange={handleChange} name="">
                        <option value="1:6">1:6</option>
                        <option value="1:1">1:1</option>
                    </select>
                </div>
                <div className="input-wrapper">
                    <label className="label-title">Syllabus:</label>
                    <select className="input-field" onChange={(e) => setSyllabus(e.target.value)}>
                        <option value="ICSE">ICSE</option>
                        <option value="CBSE">CBSE</option>
                        <option value="State">State</option>
                        <option value="IGCSE">IGCSE</option>
                        <option value="GCSE">GCSE</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="input-wrapper">
                    <label className="label-title">Start Date:</label>
                    <input type="date" className="input-field" onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="input-wrapper">
                    <label className="label-title">End Date:</label>
                    <input type="date" className="input-field" onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className="input-wrapper">
                    <label className="label-title">Total number of subjects</label>
                    <input type="number" min={0} className="input-field" value={form.totalSubjects} onChange={handleChange} name="totalSubjects" />
                </div>
                <div className="input-wrapper">
                    <label className="label-title">Classes per Week:</label>
                    {
                        form.totalSubjects && [...Array(form.totalSubjects)].map((item,index) => (
                            <SubjectHourWrapper keyIndex={index} />
                        ))
                    }
                </div>

                <ul className="results-wrapper">
                    <li className="results">Minimum Price: </li>
                    <li className="results">Suggested Price: </li>
                    <li className="results">Incentive at minimum price: </li>
                    <li className="results">Incentive at suggested price: </li>
                </ul>
            </form>
        </div>
    );
};

export default CalculatorPage
