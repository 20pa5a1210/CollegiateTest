import gql from 'graphql-tag';
export const StudentDefs = gql`
    type Student {
        studentid: ID!
        name: String!
        email: String!
        branch: String!
        status: String!
        results: [Result]
    }
    type Result {
        resultid: ID!
        examid: ID!
        studentid: ID!
        subjectid: ID
        totalmarks: Int!
        marksobtained: Int!
        totalduration: Int!
        timetaken: Int!
        submittedat: String!
    }

    input ResultInput {
        examid: ID!
        studentid: ID!
        subjectid: ID
        totalmarks: Int!
        marksobtained: Int!
        totalduration: Int!
        timetaken: Int!
    }

    input StudentInput {
        studentid: ID!
        name: String!
        email: String!
        branch: String!
        password: String!
        confirmpassword: String!
    }
    type Query {
        getStudentById(id: ID!): StudentResponse!
        getResult(studentid: ID!, examid: ID!): [Result]
    }

    type StudentResponse {
        success: Boolean!
        message: String
        data: Student
    }
    type ResultResponse {
        success: Boolean!
        message: String
        data: Result  
    }
    type Mutation {
        insertStudent(input: StudentInput!): StudentResponse!
        insertResult(result: ResultInput!): ResultResponse!
    }
`;
