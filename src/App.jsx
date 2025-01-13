import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TextEditor from "./components/TextEditor"; // Assuming your TextEditor component
import OutputPage from "./components/OutputPage";
// import "./App.css";


import AWS from "aws-sdk";
// import AWS from 'aws-sdk'; 
import { Buffer } from "buffer";


AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

const s3 = new AWS.S3();

const uploadBase64ToS3 = async (base64Image, bucketName, key) => {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  


  const buffer = Buffer.from(base64Data, "base64");
  const mimeType = base64Image.match(/data:(image\/\w+);base64/)[1];

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
    ContentEncoding: "base64",
  };

  const result = await s3.upload(params).promise();
  return result.Location;
};



const App = () => {


  const [editorData, setEditorData] = useState(`<pre><code class="language-python">
kent field 

def greet(name):
  """This function greets the person passed in as a parameter."""
  print("Hello, " + name + "!")
  greet("Alice")
</code></pre>`);


// const handleUploadImages = async () => {
//   const bucketName = "applogiq-dev-s3";
//   const updatedEditorData = editorData.replace(/<img[^>]+src="([^"]+)"[^>]*>/g, async (match, base64String) => {
//     if (base64String.startsWith("data:image")) {
//       const key = `blog/${Date.now()}.jpg`; // Generate a unique key for each image
//       const s3Url = await uploadBase64ToS3(base64String, bucketName, key);
//       return match.replace(base64String, s3Url);
//     }
//     return match; // If not Base64, keep the original src
//   });

//   // Wait for all uploads to complete and update the state
//   Promise.all(updatedEditorData).then((updatedData) =>  {console.log("updatedData:", updatedData),setEditorData(updatedData.join(""))});
// };

const handleUploadImages = async () => {
  const bucketName = "applogiq-dev-s3";
  
  // Create an array to hold the promises
  const promises = [];
  
  const updatedEditorData = editorData.replace(/<img[^>]+src="([^"]+)"[^>]*>/g, (match, base64String) => {
    if (base64String.startsWith("data:image")) {
      const key = `blog/${Date.now()}.jpg`; // Generate a unique key for each image
      const uploadPromise = uploadBase64ToS3(base64String, bucketName, key).then(s3Url => {
        return match.replace(base64String, s3Url);
      });
      promises.push(uploadPromise); // Add the promise to the array
      return match; // Return the original match for now
    }
    return match; // If not Base64, keep the original src
  });

  // Wait for all uploads to complete
  const updatedDataArray = await Promise.all(promises);
  
  // Replace the base64 strings in the original editorData with the resolved URLs
  let finalEditorData = editorData;
  updatedDataArray.forEach((updatedData) => {
    finalEditorData = finalEditorData.replace(/<img[^>]+src="([^"]+)"[^>]*>/, updatedData);
  });

  // Update the state with the final editor data
  setEditorData(finalEditorData);
};



  const handleEditorChange = (event, data) => { // Update function signature
    console.log(event,"event")
    console.log(data,"editorData")
 
    
    setEditorData(data);
  };

  console.log(editorData,"updated sate value")

  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Custom CKEditor 5 Integration</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TextEditor
                  value={editorData}
                  handleChange={handleEditorChange} // Pass the correct function
                />
                <div style={{ marginTop: "20px", background: "#f9f9f9", padding: "10px" }}>
                  <h3>Editor Output:</h3>
                  <div className="ck-content" dangerouslySetInnerHTML={{ __html: editorData }} />
                   <button onClick={handleUploadImages}>Upload Images</button>
                </div>
                <Link to={`/output?data=${encodeURIComponent(editorData)}`}>View Output on Another Page</Link>
              </>
            }
          />
          <Route path="/output" element={<OutputPage editorData={editorData} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;