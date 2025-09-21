🤖 AI Code Reviewer
A smart development partner that provides instant code reviews, fixes, complexity analysis, documentation, and language translation using the power of Google's Gemini AI.

Note: You can replace the URL above with a link to a screenshot of your finished application.

✨ Features
This full-stack application is designed to be an all-in-one toolkit for developers, providing AI-powered assistance for a variety of common coding tasks.

Comprehensive Code Review: Get a detailed analysis of your code, including potential bugs, performance bottlenecks, and adherence to best practices, complete with a quality score.

Automated Code Fixing: Automatically correct bugs and logical errors in your code with a single click.

Complexity Analysis: Instantly determine the time and space complexity (Big O notation) of your algorithms.

Documentation Generation: Create clean, professional-looking documentation for your code, outlining its purpose, parameters, and return values.

Multi-Language Code Conversion: Translate code snippets between popular programming languages like JavaScript, Python, Java, and more.

Sleek, Responsive UI: A modern and intuitive user interface that works beautifully on any device, from mobile phones to desktops.

Dark & Light Themes: A comfortable viewing experience in any lighting condition, with your preference saved locally.

🛠️ Tech Stack
This project is built with a modern, full-stack JavaScript architecture.

Frontend:

React: A declarative library for building user interfaces.

Axios: For making HTTP requests from the client to the server.

React Markdown: To render the AI-generated reviews and documentation.

React Icons: For a clean and consistent icon set.

@uiw/react-textarea-code-editor: A professional code editor component with syntax highlighting.

Backend:

Node.js: A JavaScript runtime for building the server.

Express.js: A fast and minimalist web framework for Node.js.

Google Generative AI (Gemini API): The core AI model powering all the code analysis and generation features.

dotenv: For managing environment variables and API keys securely.

cors: To enable cross-origin requests from the frontend.

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (which includes npm) installed on your machine.

A Gemini API key from Google AI Studio.

Installation & Setup
Clone the repository:

git clone [https://github.com/your-username/ai-code-reviewer.git](https://github.com/your-username/ai-code-reviewer.git)
cd ai-code-reviewer

Set up the Backend (Server):

Navigate to the server directory:

cd server

Install the required npm packages:

npm install

Create a .env file in the server directory and add your Gemini API key:

GEMINI_API_KEY="YOUR_API_KEY_HERE"
PORT=5000

Start the backend server:

npm start

The server will be running on http://localhost:5000.

Set up the Frontend (Client):

Open a new terminal window and navigate to the client directory:

cd client

Install the required npm packages:

npm install

Start the React development server:

npm start

The application will open automatically in your browser at http://localhost:3000.

✍️ Author
Prashik Wasnik

