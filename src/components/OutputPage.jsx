// OutputPage.js

import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Prism theme (optional)

import 'prismjs/components/prism-javascript.min.js'; // Prism language support for JavaScript
import 'prismjs/components/prism-python.min.js'; // Prism language support for Python
import 'prismjs/components/prism-java.min.js'; 

const OutputPage = ({ editorData }) => {

  useEffect(() => {
    Prism.highlightAll(); 
  }, [editorData]);

// useEffect(() => {
//     const codeBlocks = document.querySelectorAll('pre code'); 
//     codeBlocks.forEach(block => {
//       const className = block.className; 
//       console.log(className,"className replaced")
//       const language = className.replace('python-code', 'language-python'); // Extract language from class name


//       Prism.highlightElement(block, undefined, language); 
//     });
//   }, [editorData]); 


  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Editor Output</h1>
      <div className="ck-content" dangerouslySetInnerHTML={{ __html: editorData }} />
    </div>
  );
};

export default OutputPage;