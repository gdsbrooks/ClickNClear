import { useState } from "react";

import "./App.css";
import SearchBar from './components/SearchBar';
import SearchResultsList from "./components/List";
import {Track} from "types";

function App() {
    const [results, setResults] = useState<Track[]>([]);

    return (
        <div className="App">
            <div className="search-bar-container">
                <SearchBar setResults={setResults} />
                <SearchResultsList results={results} />
            </div>
        </div>
    );
}

export default App;
