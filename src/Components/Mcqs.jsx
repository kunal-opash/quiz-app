import React, { useState } from "react";
import logo from "../assets/img/ideas.png";
import logo1 from "../assets/img/result.png";
// import Select from "./Select";
import "./mcqs.css";
import data from "../db.json";

const Mcqs = () => {
  const allData = data.questions;
  // console.log(hello);

  const [jsonData, setJsonData] = useState(allData);
  const [filteredQue, setFilteredQue] = useState([]);
  const [que, setQue] = useState(0);
  const [innerData, setInnerData] = useState(filteredQue[0]);
  const [selectAnswer, setSelectAnswer] = useState("");
  const [result, setResult] = useState(false);
  const [ansIndex, setAnsIndex] = useState(null);
  const [selection, setSelection] = useState(false);
  let [number, setnumber] = useState(1);

  const [showresult, SetShowResult] = useState({
    right: 0,
    wrong: 0,
  });

  // console.log(filteredQue);
  // let newnum = 0;

  const { questions } = data;

  const { question, choices, correctAnswer, category } = questions[que];

  // const myData = data.questions;
  // console.log(myData)

  let num = number;
  console.log(num);
  const onNext = (event) => {
    event.preventDefault();
    setnumber(number + 1);

    // console.log(event);
    // console.log(jsonData[number + 1]);

    // console.log("Alldata>>>>>",allData);

    console.log("FilteredDATA>>>>>", filteredQue);
    setFilteredQue(filteredQue);
    setInnerData(filteredQue[num]);
    console.log(filteredQue[num]);

    console.log(num, "num....");

    // setInnerSecondData(jsonData[num + 1 ]);
    // setInnerSecondData(jsonData[]);
    // setInnerData(jsonData[number -1])

    SetShowResult((prev) =>
      selectAnswer
        ? {
            ...prev,
            right: +prev.right + 1,
          }
        : { ...prev, wrong: +prev.wrong + 1 }
    );

    // console.log(que !== questions.length - 1);
    if (que !== filteredQue.length - 1) {
      setQue((prev) => prev + 1);
    } else {
      setQue(0);
      setResult(true);
    }

    for (let i of event.target) {
      i.checked = false;
    }
    setAnsIndex(null);
  };

  // console.log(que, "question");

  const ansHandler = (item, id) => {
    // console.log(e);
    console.log(id, "option");
    setAnsIndex(id);
    if (item === correctAnswer) {
      setSelectAnswer(true);
    } else {
      setSelectAnswer(false);
      // setCheck(null);
    }
  };

  // const onPrev = () => {
  //   console.log("<<<");
  //   setQue((oldval) => oldval - 1);
  // };

  // const reactHandler = (e) => {
  //   e.preventDefault();
  //   const updateData = jsonData.filter((value) => {
  //     return value.category === "ReactJS";
  //   });
  //   console.log(">>>>React<<<", updateData);
  //   setJsonData(updateData);
  // };

  // let num = 2;

  // const jsHandler = (e) => {
  //   e.preventDefault();
  //   console.log(">>js<<", e);

  //   const updateData1 = jsonData.filter((value) => {
  //     return value.category === "JS";
  //   });

  //   console.log(">>>>JSSS<<<<<", updateData1);

  //   //   // setInnerData(jsonData[num++]);
  //   //   // setInnerData(jsonData[num]);
  //   // setInnerData(jsonData[number + 2]);

  //   //   // setJsonData('');
  // };

  // let num = 2;

  const handlerChange = (cat) => {
    // console.log("Change Value..");
    // e.preventDefault();

    // const reactHandler = jsonData.filter((value1) => {
    //   return value1.category === "ReactJS";
    // });
    // setJsonData(reactHandler);

    const reactjsHandler = jsonData.filter((value) => {
      return value.category === cat;
    });

    setFilteredQue(reactjsHandler);
    setInnerData(reactjsHandler[0]);
    // console.log(">>>>>JSON",jsonData);
    console.log("reactjsHandler", reactjsHandler);
    setSelection(true);
  };
  // setInnerData(jsonData[num])
  // console.log(innerData);

  return (
    <>
      <div className="container">
        {!result ? (
          <>
            <div className="header">
              <h1>
                <>
                  <img src={logo} alt="quiz-logo" width={35} height={35} />
                  <u>Quiz App</u>
                  <img src={logo} alt="quiz-logo" width={35} height={35} />
                </>
              </h1>
            </div>

            {!selection ? (
              <div>
                <select
                  className="custom-select"
                  onChange={(e) => handlerChange(e.target.value)}
                >
                  <option>Select Category</option>
                  <option>ReactJS</option>
                  <option>JS</option>
                </select>
              </div>
            ) : (
              <form className="value" onSubmit={onNext}>
                <div>
                  <div>
                    {/* {filteredQue.map((ele) => (
                      <> */}
                    <h2 className="question">
                      <u>{innerData.question}</u>
                    </h2>
                    <div className="form-value">
                      {innerData.choices.map((e, idx) => (
                        <>
                          <input
                            type={"checkbox"}
                            key={idx}
                            defaultChecked={false}
                            onClick={() => ansHandler(e, idx)}
                            name={e.category}
                            className={
                              setAnsIndex === idx ? "select-answer" : null
                            }
                          />
                          &nbsp;
                          <u className="form-item">{e}</u>
                          <label>
                            <br />
                          </label>
                        </>
                      ))}
                    </div>
                  </div>
                  {/* </>
                    ))} */}

                  <button
                    className="btn-next"
                    disabled={ansIndex === null}
                    // onClick={onNext}
                  >
                    {que === filteredQue.length - 1 ? "Submit" : "Next"}
                  </button>
                </div>
              </form>
            )}

            <div className="btn">
              {/* <button className="btn-prev" onClick={onPrev}>Prev</button> */}
            </div>
          </>
        ) : (
          <div className="result">
            <>
              <h1>
                Result
                <img src={logo1} alt="quiz-logo" width={35} height={35} />
                <br />
                {/* <a href="#">Go back to quiz</a> */}
              </h1>
              <div>
                <p className="result-value">
                  Question : <span>{filteredQue.length}</span>
                </p>
                <p className="result-item1">
                  Right : <span>{showresult.right}</span>
                </p>
                <p className="result-item2">
                  Wrong : <span>{showresult.wrong}</span>
                </p>
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default Mcqs;
