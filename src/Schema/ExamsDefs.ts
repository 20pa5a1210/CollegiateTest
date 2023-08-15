import gql from "graphql-tag";

export const ExamsDefs = gql`
    type Questions{
        questionid: ID!
        examid: String!
        question: String!
        options: Ioptions!
        answer: String!
    }


    input Toptions{
        option1: String!
        option2: String
        option3: String
        option4: String
    }
    type Ioptions{
        option1: String!
        option2: String
        option3: String
        option4: String
    }

    input QuestionInput{
        examid: ID!
        question: String!
        options: Toptions! 
        answer: String!
    }

    type QuestionResponse{
        success: Boolean!
        message: String!
        data: [Questions!]
    }

    type Mutation{
        addQuestions(questions: [QuestionInput!]!): QuestionResponse!
    }
`