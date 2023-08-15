import gql from "graphql-tag";

export const QuestionsDefs = gql`
    type Exam {
        examid: ID!
        subjectid : String!
        facultyemail : String!
        starttime : String!
        endtime : String!
        totalmarks : Int!
        passmarks : Int!
        totalduration : Int!
        createdat : String!
        questions: [Questions!]
    }


    type ExamResponse {
        success: Boolean!
        message: String!
        data: Exam
    }
    type Questions {
        questionid: ID!
        examid: String!
        question: String!
        options: Ioptions!
        answer: String!
    }


    input Toptions {
        option1: String!
        option2: String
        option3: String
        option4: String
    }
    type Ioptions {
        option1: String!
        option2: String
        option3: String
        option4: String
    }

    input QuestionInput {
        examid: ID!
        question: String!
        options: Toptions! 
        answer: String!
    }

    type QuestionResponse {
        success: Boolean!
        message: String!
        data: [Questions!]
    }
    input ExamInput {
        subjectid : String!
        facultyemail : String!
        starttime : String!
        endtime : String!
        totalmarks : Int!
        passmarks : Int!
        totalduration : Int!
    }

    type Mutation {
        addQuestions(questions: [QuestionInput!]!): QuestionResponse!
        CreateExam(exam: ExamInput!):ExamResponse!
    }
    type Query {
        getExamDetails(examid: ID!): ExamResponse!
    }
`