# CareerPath Gap Analyzer

A web application that helps students compare their current skills to entry-level tech role requirements, identify gaps, and generate personalized learning paths with free resources.

## Features

- **Skills Input**: Enter your skills with autocomplete suggestions and skill chips
- **Resume Parser**: Upload your resume (PDF, DOCX, TXT) to automatically extract skills
- **LinkedIn Parser**: Import skills from your LinkedIn profile via text paste or URL
- **Role Selection**: Choose from 8 curated entry-level tech roles
- **Gap Analysis**: Compare your skills to role requirements and see your readiness percentage
- **Learning Path**: Get personalized learning resources for missing skills
- **AI Chatbot**: Get personalized course recommendations and career guidance from CareerPath AI
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **CSS3** for styling
- Static JSON data for skills, roles, and resources

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key (for chatbot functionality)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
   - You can use `env.example.txt` as a template
   - Get your API key from: https://platform.openai.com/api-keys

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
src/
  ├── components/          # React components
  │   ├── SkillsInput.tsx
  │   ├── RoleSelection.tsx
  │   ├── ResultsDashboard.tsx
  │   └── LearningPath.tsx
  ├── data/                # Static JSON data
  │   ├── skills.json
  │   ├── roles.json
  │   └── resources.json
  ├── utils/               # Utility functions
  │   ├── dataLoader.ts
  │   └── gapAnalysis.ts
  ├── types.ts             # TypeScript type definitions
  ├── App.tsx              # Main application component
  └── main.tsx             # Application entry point
```

## Available Roles

1. Junior Web Developer
2. Data Analyst
3. Backend Developer
4. Full Stack Developer
5. Python Developer
6. Frontend Developer
7. DevOps Engineer
8. Database Administrator

## How It Works

1. **Add Your Skills**: Type skills in the input field or select from autocomplete suggestions
2. **Select a Role**: Choose your target role from the list
3. **View Analysis**: See your readiness percentage and skill gaps
4. **Get Learning Path**: Access recommended free resources for missing skills

## Features Implemented

- ✅ Skills input with autocomplete
- ✅ Resume parser (PDF, DOCX, TXT)
- ✅ LinkedIn parser (text paste and URL)
- ✅ Skill normalization and alias mapping
- ✅ Role selection with descriptions
- ✅ Gap analysis engine
- ✅ Readiness percentage calculation
- ✅ Missing skills categorization
- ✅ Learning resource recommendations
- ✅ AI Chatbot with GPT-4o for personalized guidance
- ✅ Responsive design
- ✅ Accessibility features (keyboard navigation, ARIA labels)

## Future Enhancements

- Multiple role comparison
- Export to PDF
- Local storage for saving progress
- Gamification with badges
- User accounts and persistence
- Enhanced LinkedIn integration

## License

Built for BDPA Indianapolis Hackathon

## Contributing

This project was built as part of a hackathon. Contributions and improvements are welcome!
