const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to create directory recursively
const mkdirRecursive = (dirPath) => {
  const directories = dirPath.split('/');
  let currentPath = '';
  directories.forEach((dir) => {
    currentPath = path.join(currentPath, dir);
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
  });
};

// Function to create file
const createFile = (filePath, content) => {
  fs.writeFileSync(filePath, content);
  console.log(`File created: ${filePath}`);
};

// Create folders and index.js files
const folders = ['controllers', 'routers', 'utils', 'config', 'models'];

folders.forEach((folder) => {
  const folderPath = path.join(__dirname, folder);
  mkdirRecursive(folderPath);

  // Create index.js file
  const indexPath = path.join(folderPath, 'index.js');
  const indexContent = `console.log("Folder ${folder} created successfully...")`;
  createFile(indexPath, indexContent);
});

// Install dependencies
console.log('Installing dependencies...');
exec('npm install express cors nodemon', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing dependencies: ${error}`);
    return;
  }

  console.log('Dependencies installed successfully!');

  // Create app.js file
  console.log('Creating app.js...');
  fs.writeFileSync(
    'app.js',
    `const express = require('express');
 const cors = require('cors');
 
 const app = express();
 const PORT = 4500;
 
 app.use(cors());
 
 app.get('/', (req, res) => {
   res.send('Hello, world!');
 });
 
 app.listen(PORT, () => {
   console.log(\`Server is running on port \${PORT}\`);
 });`
  );

  console.log('Project setup complete!');
});
