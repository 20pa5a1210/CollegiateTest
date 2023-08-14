import gql from "graphql-tag";

export const FacultyDefs = gql`
    type Faculty {
        facultyemail: ID!
        facultyname: String!
        facultynumber: String!
        status: String!
        subjects: [Subject]
    }

    input FacultyInput {
        facultyemail: ID!
        facultyname: String!
        facultynumber: String!
        password: String!
        confirmpassword: String!
    }

    type FacultyResponse {
        data: Faculty
        message: String!
        success: Boolean!
    }

    type SubjectResponse {
        data: Subject
        message: String!
        success: Boolean!
    }

    type Subject {
        subjectid: ID!
        subjectname: String!
    }
    input SubjectInput {
        subjectid: ID!
        subjectname: String!
        facultyemail: String!
    }

    type Query {
        getFacultyByEmail(facultyemail: ID!): FacultyResponse!
    }
    type Mutation {
        addFaculty(faculty: FacultyInput!): FacultyResponse!
        addSubject(subject: SubjectInput!): SubjectResponse!
    }
`