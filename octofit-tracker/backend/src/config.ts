const PORT = Number(process.env.PORT || 8000);
const CODESPACE_NAME = process.env.CODESPACE_NAME || '';

export const SERVER_CONFIG = {
  port: PORT,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db',
  apiUrl: CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
    : `http://localhost:${PORT}`,
  isCodespaces: Boolean(CODESPACE_NAME),
  codespaceName: CODESPACE_NAME,
};
