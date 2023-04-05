import React from "react";

const Select = (props) => {
  console.log(props);
  return (
    <div>
      <div className="question">
        <h2>
          <u>{props.data.question}</u>
        </h2>
      </div>
      <input
        type={"checkbox"}
        key={props.key}
        // defaultChecked={false}
        // onClick={() => ansHandler(ele, id)}
        // name={ele.category}
        // className={setAnsIndex === id ? "select-answer" : null}
      />
      &nbsp;
      {props.choices.map((item)=>{
        <u className="form-item">{item}</u>
      })}
      <label >
        <br />
      </label>
    </div>
  );
};

export default Select;
