export interface Test {
    _id: string;
    question:string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer:string;
    combineId:any;

  }
  export interface ActionTest {
    question:string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer:string;
    combineId:any;

  }
  export interface TestArray {
    all_tests:Test[],
    particular_test:Test,
    filter:any,
  }