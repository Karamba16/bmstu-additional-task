import "./StudentPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iStudentsMock, requestTime} from "../../utils/consts";
import {Student} from "../../utils/types";
import mockImage from "/src/assets/mock.png"

const StudentPage = ({ selectedStudent, setSelectedStudent }: { selectedStudent:Student | undefined, setSelectedStudent: Dispatch<Student| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/students/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const service: Student = await response.json()

            setSelectedStudent(service)

            setIsMock(false)

        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedStudent(iStudentsMock.find((service:Student) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/students/${id}/image/`

    if (selectedStudent == undefined) {
        return (
            <div className="page-details-wrapper">

                <Link className="return-link" to="/">
                    Назад
                </Link>

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{selectedStudent.name}</h2>

                    <br />

                    <span>Факультет: { selectedStudent.faculty }</span>

                    <br />

                    <span>Группа: { selectedStudent.group }</span>


                </div>

            </div>

        </div>
    )
}

export default StudentPage;