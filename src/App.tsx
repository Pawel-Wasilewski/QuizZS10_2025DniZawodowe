import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Link,  useSearchParams} from "react-router-dom";
import { Game } from "./Game";

export function App() {
    return (
        <Router basename="/QuizZS10_2025DniZawodowe">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<GameRouter />} />
            </Routes>
        </Router>
    );
}

export function Home() {
    return (
        <main>
            <h1 className={"text-center mt-5"}> Wybierz poziom </h1>

            <section className={"d-flex justify-content-center align-items-center vh-100 flex-wrap flex-column"}>
                <Link
                    to={"/game?mode=easy"}
                    className={"btn btn-primary m-1 fs-3 fw-bold"}
                    style={{
                        width: '70%',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'optimizeLegibility'
                    }}
                >
                    Szkoła Podstawowa
                </Link>

                <Link
                    to={"/game?mode=hard"}
                    className={"btn btn-primary m-1 fs-3 fw-bold"}
                    style={{
                        width: '70%',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'optimizeLegibility'
                    }}
                >
                    Szkoła Średnia
                </Link>
            </section>
        </main>
    );
}

function GameRouter() {
    const [searchParams] = useSearchParams();
    const isHardMode = searchParams.get("mode") === "hard";
    return <Game isHardMode={isHardMode} />;
}

export default App;
