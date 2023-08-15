export type FacultyResp = {
    facultyemail: string
    facultyname: string
    facultynumber: string
    password: string
    confirmpassword: string
    status: string
}
export type SubjectResp = {
    subjectname: string
    subjectid: string
    facultyemail: string
}
type Toptions = {
    option1: string
    option2: string
    option3: string
    option4: string
}

export type QuestionInput = {
    examid: string
    question: string
    options: Toptions
    answer: string
}


