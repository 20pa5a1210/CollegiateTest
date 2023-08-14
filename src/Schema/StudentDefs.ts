import gql from 'graphql-tag';
export const StudentDefs = gql`
    type Student {
        studentid: ID!
        name: String!
        email: String!
        branch: String!
        status: String!
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
    }

    type StudentResponse {
        success: Boolean!
        message: String
        student: Student
    }
    type Mutation {
        insertStudent(input: StudentInput!): StudentResponse!
    }
`;
