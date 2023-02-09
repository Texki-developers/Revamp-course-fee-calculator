import React, { useEffect, useState } from 'react'

export default function SubjectHourWrapper({keyIndex,form, setForm}) {
    const [data,setData] = useState({subject:'',value:'',classes:0})
    
    useEffect(() => {
        setForm({...form,classesPerWeek: data})
    },[data])
    return (
        <div className="subject-hour-wrapper">
            <select name="subject" className='input-field' id="">     
                <option value="Maths">Maths</option>
                <option value="Science" >Science</option>
                <option value="Social">Social</option>
                <option value="Hindi">Hindi</option>
                <option value="Other">Other</option>
            </select>
            <input type="number" className='input-field' name="hour" placeholder='No. of classes' id="hour" />
        </div>
    )
}
