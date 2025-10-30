import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from 'react-router-dom';
import { Game } from './Game.tsx';

export function App() {
    return (
        <Router basename={import.meta.env.BASE_URL}>
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
            <img src={'startMenu.png'} alt={'Groszek startMenu.png'} className={'img-fluid d-block mx-auto'}
                 style={{ maxWidth: '90%', height: 'auto' }} />

            <section className={'d-flex justify-content-center align-items-center flex-wrap flex-column'}>
                <Link
                    to={'/game?mode=easy'}
                    className={'btn btn-success m-1 fs-3 fw-bold'}
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
                    to={'/game?mode=hard'}
                    className={'btn btn-success m-1 fs-3 fw-bold'}
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
    const isHardMode = searchParams.get('mode') === 'hard';
    return <Game isHardMode={isHardMode} />;
}

export default App;
