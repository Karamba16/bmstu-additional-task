import "./HomePage.sass"
import image from "/src/assets/home.jpg"

const HomePage = () => {
    return (
        <div className="home-page-wrapper">
            <h2>Добро пожаловать в электронный университет!</h2>
            <img src={image} />
        </div>
    )
}

export default HomePage