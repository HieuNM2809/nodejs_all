import { Button, Divider, Grid, Typography } from "@mui/material";
import { Container } from "@mui/material";
import Loading from "components/Backdrop";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { Major, MajorCompleTest } from "models/major";
import { useEffect, useState } from "react";
import TestService from "services/test";
import { fetchCombines } from "store/combine/combine-actions";
import { fetchMajors, fetchMajorsAction } from "store/major/major-actions";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import classes from "./styles.module.scss";
import { Link } from "react-router-dom";
import { Test } from "models/test";

const MBTI = () => {
  const dispatch = useAppDispatch();

  const allCombine = useAppSelector((state) => state.combine.all_options);
  // const allMajors = useAppSelector((state) => state.major.all_majors);
  const [stateNameTestCombine, setStateNameTestCombine] = useState("");
  const [stateIdCombine, setStateIdCombine] = useState("");
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [resultMajor, setResultMajor] = useState<MajorCompleTest[]>([]);
  const [listTestCombine, stateListTestCombine] = useState<Test[]>([]);

  useEffect(() => {
    // setIsLoading(true)
    dispatch(fetchCombines(allCombine));
  }, []);
  useEffect(() => {
    if (stateIdCombine !== "") {
      setIsLoading(true);
      TestService.getTestCombine(stateIdCombine).then((res) => {
        stateListTestCombine(res);
        setIsLoading(false);
      });
    }
  }, [stateIdCombine]);
  const choiceAnswer = (ans: any, corAns: any) => {
    if (ans === corAns) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < listTestCombine.length) { 
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowFinal(true);

      setIsLoading(true);
      // dispatch(fetchMajorsAction(allMajors)).then(() => {
        TestService.getResultTest(stateIdCombine, (score) * 3).then(
          (res) => {
            setResultMajor(res);
            setIsLoading(false);
          }
        );
      // });
    }
  };
  const resetTest = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowFinal(false);
  };
  const changeCombineTest = (com: any) => {
    if (currentQuestion > 0) {
      toast.error("Vui lòng hoàn thành bài kiểm tra đã chọn!", {
        position: "top-right",
      });
      // return;
    } else {
      setStateNameTestCombine(com?.name);
      setStateIdCombine(com?._id);
    }
  };

  return (
    <>
      <Header></Header>
      <Grid
        sx={{
          textAlign: "center",
          backgroundColor: "#f4f4f4",
          padding: "10px 0px",
          minHeight: "61.7vh",
        }}
      >
        <Grid xs={12} md={12} className={classes.listCombine}>
          {allCombine.map((com: any, index: number) => (
            //    <Button  onClick={()=>setStateIdTestCombine(com?.name)} key={index} >{com?.name}</Button>
            <Button
              onClick={() => changeCombineTest(com)}
              key={index}
              className={classes.btnChooseCombine}
            >
              {com?.name}
            </Button>
          ))}
        </Grid>
        <Grid className={classes.whesBox}>
          {stateNameTestCombine === "" ? (
            <h2 className={classes.pleaseChoose}>Vui lòng chọn khối ngành!</h2>
          ) : (
            <Grid xs={12} md={12}>
              {isLoading ? (
                <Loading />
              ) : (
                <Grid>
                  {showFinal ? (
                    <Grid>
                      {
                        <p className={classes.scoreResult}>
                          Số điểm của bạn đạt được: {score * 3} / 30 điểm
                        </p>
                      }
                      <div className={classes.boxResultMajor}>
                        {resultMajor.length !== 0 ? (
                          <p className={classes.majorResult}>
                            Ngành nghề phù hợp với bạn
                          </p>
                        ) : (
                          <p className={classes.majorResult}>
                            Chưa tìm thấy ngành phù hợp
                          </p>
                        )}
                        <Divider
                          sx={{ borderColor: "#f8b600", marginBottom: "10px" }}
                        />
                        {resultMajor?.map((maj, index) => (
                          <Grid>
                            {maj?._id === undefined ? (
                              ""
                            ) : (
                              <Grid
                                key={index}
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  borderBottom:"1px solid rgba(0,0,0,0.4)",
                                  marginBottom:"10px"
                                }}
                              >
                                <Grid sx={{display:"grid"}}>
                                <Typography sx={{textAlign:"left"}}>{maj?.majorId?.name}</Typography>
                                <Typography sx={{textAlign:"left"}}>{maj?.schoolId?.name}</Typography>
                                </Grid>
                              
                                <Link
                                  to={`/major/${maj?.schoolId?._id}/${maj?.majorId?._id}`}
                                  className={classes.linkToMajor}
                                >
                                  <Button className={classes.btnView}>
                                    XEM
                                  </Button>
                                </Link>
                              </Grid>
                            )}
                          </Grid>
                        ))}
                      </div>

                      <Button onClick={resetTest} className={classes.btnReset}>
                        Kết thúc
                      </Button>
                    </Grid>
                  ) : (
                    <Grid sx={{ marginLeft: "20px" }}>
                      {/* <h1>Điểm hiện tại: {score}</h1> */}

                      <p className={classes.testNameCombine}>
                        Bài kiểm tra khối: {stateNameTestCombine}
                      </p>

                      <Grid
                        container
                        spacing={2}
                        className={classes.containerWhes}
                      >
                        <Grid item xs={12} md={4} className={classes.left}>
                          <Typography sx={{ fontSize: "24px" }}>
                            Câu hỏi {currentQuestion + 1} /{" "}
                            {listTestCombine?.length}:
                          </Typography>
                          <h2 className={classes.questionH2}>
                            {listTestCombine[currentQuestion]?.question}
                          </h2>
                        </Grid>
                        {listTestCombine?.length > 0 ? (
                          <Grid item xs={12} md={8} className={classes.right}>
                            <Button
                              onClick={() =>
                                choiceAnswer(
                                  listTestCombine[currentQuestion]?.answerA,
                                  listTestCombine[currentQuestion]
                                    ?.correctAnswer
                                )
                              }
                              className={classes.btnAns}
                            >
                              {listTestCombine[currentQuestion]?.answerA}
                            </Button>
                            <Button
                              onClick={() =>
                                choiceAnswer(
                                  listTestCombine[currentQuestion]?.answerB,
                                  listTestCombine[currentQuestion]
                                    ?.correctAnswer
                                )
                              }
                              className={classes.btnAns}
                            >
                              {listTestCombine[currentQuestion]?.answerB}
                            </Button>
                            <Button
                              onClick={() =>
                                choiceAnswer(
                                  listTestCombine[currentQuestion]?.answerC,
                                  listTestCombine[currentQuestion]
                                    ?.correctAnswer
                                )
                              }
                              className={classes.btnAns}
                            >
                              {listTestCombine[currentQuestion]?.answerC}
                            </Button>
                            <Button
                              onClick={() =>
                                choiceAnswer(
                                  listTestCombine[currentQuestion]?.answerD,
                                  listTestCombine[currentQuestion]
                                    ?.correctAnswer
                                )
                              }
                              className={classes.btnAns}
                            >
                              {listTestCombine[currentQuestion]?.answerD}
                            </Button>
                          </Grid>
                        ) : (
                          <h2>Chưa có câu hỏi cho bài kiểm tra khối này!</h2>
                        )}
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      <Footer></Footer>
    </>
  );
};
export default MBTI;
