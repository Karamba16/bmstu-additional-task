import "./StudentsList.sass"
import SearchBar from "../../components/SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import StudentCard from "./StudentCard/StudentCard";
import {iStudentsMock, requestTime} from "../../utils/consts";
import {Student} from "../../utils/types";

const StudentsList = () => {

    const [Students, setStudents] = useState<Student[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchStudents = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8000/api/students/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const students: Student[] = raw["students"]

            setStudents(students)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setStudents(iStudentsMock)

    }

    useEffect(() => {
        searchStudents()
    }, [])

    const cards = Students.map(student  => (
        <StudentCard student={student} key={student.id} isMock={isMock}/>
    ))

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        searchStudents()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={(e) => handleSubmit(e)}>

                <h2>Поиск студентов</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default StudentsList;