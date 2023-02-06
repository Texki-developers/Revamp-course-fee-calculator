import React, { useEffect, useState } from 'react'
import './Home.scss'

export default function Home() {
    const [options, setOptions] = useState(['CBSE', 'ICSE', "State Syllabus"])
    const [form,setForm] = useState({syllabus: "CBSE",subject:"1",main:'1',languages:'0'});

    const handleChange = event => setForm({...form,[event.target.name]: event.target.value })

    useEffect(() => {
        // Calculations logic here
    },[form])

    return (
        <div className="home-page-container">
            <form className="calculate-form">
                <h1 className="form-title">Revamp course price calculator</h1>
                <label className='input-wrapper' htmlFor='syllabus'>
                    <span className="label-title">Syllabus</span>
                    <select name='syllabus' value={form.syllabus} onChange={handleChange} className="input-field" id='syllabus'>
                        {
                            options.map((option, index) => (
                                <option value={option} key={index}>{option}</option>
                            ))
                        }
                    </select>
                </label>
                <label htmlFor="subject" className="input-wrapper">
                    <span className="label-title">Number of subjects</span>
                    <input type="number" value={form.subject} onChange={handleChange} name="subject" min={0} id="subject" className="input-field" />
                </label>
                <label htmlFor="main" className="input-wrapper">
                    <span className="label-title">Main Subjects</span>
                    <input type="number" value={form.main} onChange={handleChange} name="main" min={0} id="main" className="input-field" />
                </label>
                <label htmlFor="languages" className="input-wrapper">
                    <span className="label-title">Languages</span>
                    <input type="number" value={form.languages} onChange={handleChange} name="languages" min={0} id="languages" className="input-field" />
                </label>

                <ul className="results-wrapper">
                    <li className="results">Minimum Price: </li>
                    <li className="results">Suggested Price: </li>
                    <li className="results">Incentive at minimum price: </li>
                    <li className="results">Incentive at suggested price: </li>
                </ul>

            </form>
        </div>
    )
}
