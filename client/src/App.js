// Main React component for the AI Code Reviewer UI.
// - Left panel: code input, language selectors, action buttons.
// - Right panel: displays review, fixed code, complexity analysis, docs, or conversion.
// - Uses a small set of API endpoints on the server (http://localhost:5000/api/*).

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FaCode, FaBolt, FaWrench, FaSun, FaMoon, FaChartLine, FaFileAlt, FaSyncAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import CodeEditor from '@uiw/react-textarea-code-editor';
import './App.css';

function App() {
    // --- UI theme (dark/light) ---
    // Persists to localStorage so the user's preference is preserved.
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    // --- Code content and outputs from server ---
    const [code, setCode] = useState(''); // User input code
    const [review, setReview] = useState(''); // Markdown review from AI
    const [fixedCode, setFixedCode] = useState(''); // Fixed code returned from AI
    const [complexityAnalysis, setComplexityAnalysis] = useState(''); // Complexity markdown
    const [documentation, setDocumentation] = useState(''); // Generated documentation
    const [convertedCode, setConvertedCode] = useState(''); // Language-converted code

    // --- Language selectors for conversion ---
    const [sourceLanguage, setSourceLanguage] = useState('JavaScript');
    const [targetLanguage, setTargetLanguage] = useState('Python');

    // --- UI state ---
    const [isLoading, setIsLoading] = useState(false); // Shows "Working on it..." state
    const [error, setError] = useState(''); // Holds server-side error messages
    const [activeView, setActiveView] = useState('placeholder'); // 'review'|'fix'|'complexity'|'document'|'convert'|'error'
    const [copyButtonText, setCopyButtonText] = useState('Copy'); // Temporary button text when copying

    // Supported languages in the dropdowns.
    const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'TypeScript', 'Ruby', 'PHP'];

    // Toggle theme and persist choice.
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    // Apply theme to body and save preference on change.
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // --- Copy to clipboard helper ---
    // Copies the currently visible output (review/fix/complexity/document/convert).
    const handleCopy = () => {
        const contentToCopy =
            activeView === 'review' ? review :
                activeView === 'fix' ? fixedCode :
                    activeView === 'complexity' ? complexityAnalysis :
                        activeView === 'document' ? documentation :
                            convertedCode;

        if (contentToCopy) {
            const textarea = document.createElement('textarea');
            textarea.value = contentToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy'); // legacy but works in many browsers
            document.body.removeChild(textarea);

            // Provide quick feedback to the user.
            setCopyButtonText('Copied!');
            setTimeout(() => setCopyButtonText('Copy'), 2000);
        }
    };

    // --- Generic API request helper ---
    // endpoint: path suffix after /api/ (e.g., 'review', 'fix', 'convert')
    // payload: object to send as JSON body
    // viewName: used for setting activeView and error messages
    // successCallback: function called with response.data to update local state
    const handleApiRequest = async (endpoint, payload, viewName, successCallback) => {
        if (!code.trim()) {
            // Basic client-side validation: require code before calling server.
            setError('Please enter some code to analyze.');
            setActiveView('error');
            return;
        }

        // Reset UI state for a fresh request.
        setIsLoading(true);
        setError('');
        setReview('');
        setFixedCode('');
        setComplexityAnalysis('');
        setDocumentation('');
        setConvertedCode('');
        setCopyButtonText('Copy');
        setActiveView(viewName);

        try {
            // POST to the local server endpoint, expect JSON response.
            const response = await axios.post(`http://localhost:5000/api/${endpoint}`, payload);
            // Let caller update appropriate state with response.data
            successCallback(response.data);
        } catch (err) {
            // Surface server-provided error message if available.
            const errorMessage = err.response?.data?.error || `Failed to fetch ${viewName}.`;
            setError(errorMessage);
            setActiveView('error');
        } finally {
            setIsLoading(false);
        }
    };

    // --- Render logic for the right-hand panel ---
    // Displays markdown or code editor depending on active view.
    const renderRightPanelContent = () => {
        if (isLoading) return <div className="placeholder-content">Working on it...</div>;
        if (activeView === 'error') return <div className="placeholder-content error-message">{error}</div>;

        const markdownContent =
            activeView === 'review' ? review :
                activeView === 'complexity' ? complexityAnalysis :
                    activeView === 'document' ? documentation : null;

        if (markdownContent) {
            // Wrap ReactMarkdown in a styled container rather than passing className directly.
            // ReactMarkdown renders markdown (headings, lists, code blocks).
            return (
                <div className="review-output">
                    <ReactMarkdown>
                        {markdownContent}
                    </ReactMarkdown>
                </div>
            );
        }

        if (activeView === 'fix' && fixedCode) {
            // Show fixed code in a read-only code editor.
            return <CodeEditor value={fixedCode} language={sourceLanguage.toLowerCase()} data-color-mode={theme} padding={15} readOnly style={{ flexGrow: 1, fontFamily: "'Fira Code', 'Courier New', monospace", fontSize: '0.95rem' }} />;
        }
        if (activeView === 'convert' && convertedCode) {
            // Show converted code in a read-only code editor, using targetLanguage for syntax highlighting.
            return <CodeEditor value={convertedCode} language={targetLanguage.toLowerCase()} data-color-mode={theme} padding={15} readOnly style={{ flexGrow: 1, fontFamily: "'Fira Code', 'Courier New', monospace", fontSize: '0.95rem' }} />;
        }
        // Default placeholder when nothing has been triggered yet.
        return <div className="placeholder-content"><FaBolt /><p>Run an analysis to see the results here.</p></div>;
    };

    // Choose title and icon of right panel based on active view.
    const getPanelTitle = () => {
        switch (activeView) {
            case 'review': return { icon: <FaBolt />, text: 'Analysis Results' };
            case 'fix': return { icon: <FaWrench />, text: 'Corrected Code' };
            case 'complexity': return { icon: <FaChartLine />, text: 'Complexity Analysis' };
            case 'document': return { icon: <FaFileAlt />, text: 'Generated Documentation' };
            case 'convert': return { icon: <FaSyncAlt />, text: `Converted Code (${targetLanguage})` };
            default: return { icon: <FaBolt />, text: 'Analysis Results' };
        }
    };
    const { icon, text } = getPanelTitle();

    // --- JSX: UI layout ---
    return (
        <div className="App">
            <header className="App-header">
                {/* Theme toggle button */}
                <button onClick={toggleTheme} className="theme-toggle-button">
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
                <h1>🤖 AI Code Reviewer</h1>
                <p>Not just a code reviewer : but your smartest development partner </p>
            </header>

            <main className="main-content">
                {/* Left panel: code input, language selectors, action buttons */}
                <div className="panel">
                    <h2 className="panel-title"><FaCode /> Code Input</h2>

                    {/* Language dropdowns for conversions */}
                    <div className="language-selectors">
                        <div>
                            <label htmlFor="source-lang">From</label>
                            <select id="source-lang" value={sourceLanguage} onChange={e => setSourceLanguage(e.target.value)}>
                                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="target-lang">To</label>
                            <select id="target-lang" value={targetLanguage} onChange={e => setTargetLanguage(e.target.value)}>
                                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Main code editor where user pastes code */}
                    <div className="code-editor-container">
                        <CodeEditor value={code} language={sourceLanguage.toLowerCase()} placeholder="Paste your code here..." onChange={(e) => setCode(e.target.value)} data-color-mode={theme} padding={15} style={{ height: '100%', width: '100%', fontFamily: "'Fira Code', 'Courier New', monospace", fontSize: '0.95rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                    </div>

                    {/* Action buttons that call the server endpoints */}
                    <div className="button-group">
                        <button onClick={() => handleApiRequest('review', { code }, 'review', data => setReview(data.review))} disabled={isLoading} className="analyze-button"><FaBolt /> Review</button>
                        <button onClick={() => handleApiRequest('fix', { code }, 'fix', data => setFixedCode(data.fixedCode))} disabled={isLoading} className="analyze-button secondary-button"><FaWrench /> Fix</button>
                        <button onClick={() => handleApiRequest('complexity', { code }, 'complexity', data => setComplexityAnalysis(data.analysis))} disabled={isLoading} className="analyze-button tertiary-button"><FaChartLine /> Complexity</button>
                        <button onClick={() => handleApiRequest('document', { code }, 'document', data => setDocumentation(data.documentation))} disabled={isLoading} className="analyze-button quaternary-button"><FaFileAlt /> Write Docs</button>
                        <button onClick={() => handleApiRequest('convert', { code, sourceLanguage, targetLanguage }, 'convert', data => setConvertedCode(data.convertedCode))} disabled={isLoading} className="analyze-button quinary-button"><FaSyncAlt /> Convert</button>
                    </div>
                </div>

                {/* Right panel: results */}
                <div className="panel">
                    <h2 className="panel-title">{icon} {text}</h2>
                    {/* Show copy button when there is output and not loading */}
                    {(review || fixedCode || complexityAnalysis || documentation || convertedCode) && !isLoading && (<button onClick={handleCopy} className="copy-button">{copyButtonText}</button>)}
                    <div className="right-panel-content">
                        {renderRightPanelContent()}
                    </div>
                </div>
            </main>

            {/* Footer with author links */}
            <footer className="App-footer">
                <p>
                    Developed by Prashik :
                    <a href="https://www.linkedin.com/in/prashik-wasnik/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin /> Prashik Wasnik
                    </a>
                    <span className="footer-separator">|</span>
                    <a href="https://github.com/prashik-54" target="_blank" rel="noopener noreferrer">
                        <FaGithub /> Prashik-54
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default App;

