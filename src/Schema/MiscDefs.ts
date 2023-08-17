import gql from "graphql-tag";

export const MiscDefs = gql`
    type Announcements {
        announcementid: ID!
        title: String!
        content: String!
        postedby: String!
        postedat: String!
    }
    input AnnouncementInput {
        title: String!
        content: String!
        postedby: String!
    }

    type AnnouncementResponse {
        success: Boolean!
        message: String!
        data: [Announcements!]
    }

    type Mutation {
        addAnnouncement(announcement: AnnouncementInput!): AnnouncementResponse!
    }
    type Query {
        getAnnouncements: AnnouncementResponse!
        getAnnouncementById(announcementid: ID!): AnnouncementResponse!
    }

`
