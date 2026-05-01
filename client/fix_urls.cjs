const fs = require('fs');
const path = require('path');

const replacements = {
  'RegisterPage.jsx': ['/api/auth/register'],
  'LoginPage.jsx': ['/api/auth/login'],
  'TeamView.jsx': ['/api/teams/myteam', '/api/teams', '/api/auth/profile'],
  'TeamDetails.jsx': ['/api/teams/myteam'],
  'Round2View.jsx': ['/api/state', '/api/teams/myteam', '/api/teams/results/1', '/api/questions?round=2', '/api/submissions/my-submission/2', '/api/round2/upload'],
  'Round1View.jsx': ['/api/state', '/api/state', '/api/teams/myteam', '/api/quiz/my-submission/1', '/api/quiz/start/1'],
  'ResultsView.jsx': ['/api/state', '/api/teams/results/1'],
  'quizTaker.jsx': ['/api/quiz/submit/1'],
  'PaymentView.jsx': ['/api/teams/myteam', '/api/payments/submit-proof'],
  'CreateTeamForm.jsx': ['/api/teams', '/api/auth/profile'],
  'UserManagementView.jsx': ['/api/auth/users'],
  'TeamPaymentsView.jsx': ['/api/teams'],
  'SubmissionsView.jsx': ['/api/submissions/round/2'],
  'Round2SettingsView.jsx': ['/api/state', '/api/questions?round=2'],
  'Round1ResultsView.jsx': ['/api/teams/results/1'],
  'Round1QuestionsView.jsx': ['/api/state', '/api/questions?round=1', '/api/questions', '/api/questions?round=1', '/api/questions?round=1', '/api/state/round1']
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      const fileName = path.basename(file);
      if (replacements[fileName]) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let index = 0;
        const toReplace = "import.meta.env.VITE_API_URL + ''";
        while (content.includes(toReplace) && index < replacements[fileName].length) {
          content = content.replace(toReplace, "'" + replacements[fileName][index] + "'");
          index++;
        }
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDir(path.join(__dirname, 'src'));
