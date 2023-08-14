import gql from "graphql-tag";

export const FacultyDefs = gql`
    type Faculty {
        facultyemail: ID!
        facultyname: String!
        facultynumber: String!
        status: String!
    }

    input FacultyInput {
        facultyemail: ID!
        facultyname: String!
        facultynumber: String!
        password: String!
        confirmpassword: String!
    }

    type FacultyResponse {
        faculty: Faculty
        message: String!
        success: Boolean!
    }
    type Query {
        getFacultyByEmail(facultyemail: ID!): FacultyResponse!
    }
    type Mutation {
        addFaculty(faculty: FacultyInput!): FacultyResponse!
    }
`