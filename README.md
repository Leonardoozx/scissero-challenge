# Scissero Fay Gambe

This project is a Node.js application that generates a DOCX document using the `docx` library.

#### PS: used .mjs file extensions for using import and export statements

### Project Structure:
- src
  - utils
    - captalizeWords.mjs
    - docxHandler.mjs
  - generateDocx.mjs
  - index.mjs

### Recommended Node Version: >= v20.16.0

### Installing and running:

1. Clone the repository
2. In root directory install the dependencies:
    ```bash
    npm install
    ```

3. Run the application:
    ```bash
    npm start
    ```
    #### A file 'test.docx' will be generated with the data of inputData object which is in src/index.mjs file  

    Or if wanting to run the direct answer to the assessment:

    ```bash
    node assessmentDirectResponse.mjs
    ```
    ### PS: It will throw an error for not having the DocxHandler class defined
