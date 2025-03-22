import './App.scss';
import ProjectGrid from './components/ProjectGrid';

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <h1>Project Grid</h1>
            </header>
            <main className="app-main">
                <ProjectGrid />
            </main>
            <footer className="app-footer">
                <p>&copy; 2024 Project Grid. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
