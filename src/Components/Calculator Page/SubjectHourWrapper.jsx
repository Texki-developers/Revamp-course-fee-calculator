import React, { useEffect, useRef, useState } from "react";
import subjectsList from "../../JSONDB/subjectsList";

export default function SubjectHourWrapper({
  keyIndex,
  formAction,
  formData,
  schedule,
}) {
  const [data, setData] = useState(false);

  let idRef = useRef("");
  useEffect(() => {
    if (data) {
      formAction((prev) => {
        let findID = prev.classesPerWeek.findIndex(
          (item) => item.id === data.id
        );
        console.log(findID);
        if (findID !== -1) {
          prev.classesPerWeek.splice(findID, 1, data);
        } else {
          prev.classesPerWeek.push(data);
        }
        return {
          ...prev,
          classesPerWeek: [...prev.classesPerWeek],
        };
      });
    }
  }, [data]);

  useEffect(() => {
    formAction((prev) => {
      return {
        ...prev,
        classesPerWeek: [...prev.classesPerWeek, subjectsList[keyIndex]],
      };
    });
  }, []); 

  return (
    <div className="subject-hour-wrapper">
      {
        <select
          ref={idRef}
          name="subject"
          className="input-field"
          id={
            formData.classesPerWeek.length > 0 &&
            formData.classesPerWeek[keyIndex].id
          }
          onChange={(e) => {
            setData((oldState) => ({
              ...oldState,
              subject: e.target.value,
              id: e.target.id,
            }));
          }}
        >
          <option
            id={
              formData.classesPerWeek.length > 0 &&
              formData.classesPerWeek[keyIndex].id
            }
            value={
              formData.classesPerWeek.length > 0 &&
              formData.classesPerWeek[keyIndex].value
            }
            selected
          >
            {subjectsList[keyIndex].subject}
          </option>
          {subjectsList &&
            subjectsList.map((i, index) => (
              <option id={i.id} value={i.value}>
                {i.subject}{" "}
              </option>
            ))}
        </select>
      }
      <input
        type="number"
        className="input-field"
        value={
          formData.classesPerWeek.length > 0 &&
          formData.classesPerWeek[keyIndex].dValue
        }
        name="hour"
        placeholder="No. of classes"
        id={
          formData.classesPerWeek.length > 0 &&
          formData.classesPerWeek[keyIndex].id
        }
        onChange={(e) => {
          setData((oldState) => ({
            ...oldState,
            dValue: e.target.value,
            id: e.target.id,
          }));
        }}
      />
    </div>
  );
}
