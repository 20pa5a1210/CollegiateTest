export type StudentInput = {
    studentid: string
    name: string
    email: string
    branch: string
    password: string
    confirmpassword: string
    status: string
}

export type StudentResult = {
    resultid: string
    examid: string
    studentid: string
    subjectid: string
    totalmarks: number
    marksobtained: number
    totalduration: number
    timetaken: number
    submittedat: string
}