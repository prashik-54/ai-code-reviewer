
# 🤖 AI Code Reviewer

A smart development partner that provides instant code reviews, fixes, complexity analysis, documentation, and language translation using the power of Google's Gemini AI.


## ✨ Features

- Comprehensive Code Review: Get a detailed analysis of your code, including potential bugs, performance bottlenecks, and adherence to best practices, complete with a quality score.

- Automated Code Fixing: Automatically correct bugs and logical errors in your code with a single click.

- Complexity Analysis: Instantly determine the time and space complexity (Big O notation) of your algorithms.

- Documentation Generation: Create clean, professional-looking documentation for your code, outlining its purpose, parameters, and return values.

- Multi-Language Code Conversion: Translate code snippets between popular programming languages like JavaScript, Python, Java, and more.

- Sleek, Responsive UI: A modern and intuitive user interface that works beautifully on any device, from mobile phones to desktops.

- Dark & Light Themes: A comfortable viewing experience in any lighting condition, with your preference saved locally.
## 🛠️ Tech Stack

**Frontend :**

**React:** A declarative library for building user interfaces.

**Axios:** For making HTTP requests from the client to the server.

**React Markdown:** To render the AI-generated reviews and documentation.

**React Icons:** For a clean and consistent icon set.

**@uiw/react-textarea-code-editor:** A professional code editor component with syntax highlighting.

**Backend :**

**Node.js:** A JavaScript runtime for building the server.

**Express.js:** A fast and minimalist web framework for Node.js.

**Google Generative AI (Gemini API):** The core AI model powering all the code analysis and generation features.

**dotenv:** For managing environment variables and API keys securely.

**cors:** To enable cross-origin requests from the frontend.


## 🚀 Run Locally

TO clone the project , follow this steps.

**Prerequisites**
- Node.js (v18 or later)
- npm (Node Package Manager)
- A Gemini API key from Google AI Studio.


**1.Clone the Repository**
```bash
  git clone https://github.com/prashik-54/ai-code-reviewer.git
```

**2.Configure the Backend**

- Navigate to the server directory:
```bash
  cd ai-code-reviewer/server
```

- Install Server dependencies:

```bash
  npm install
```
Create a ``` .env ``` file and add your credentials:
```bash
  GEMINI_API_KEY="YOUR_API_KEY_HERE"
  PORT=5000
```
- Start the backend server:
```bash
  node index.js
```
**3.Configure the Frontend :**

- Navigate to the client directory:
```bash
  cd ..
  cd client
```
- Install client dependencies:

```bash
  npm install
```
Start the React development server:
```bash
  npm start
```
The application will open automatically in your browser at http://localhost:3000.




## ✍️ Author

Prashik Wasnik
- LinkedIn: [prashik-wasnik](https://www.linkedin.com/in/prashik-wasnik/)
- GitHub: [prashik-54](https://github.com/prashik-54)



