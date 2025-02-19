"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box, Paper, Typography } from "@mui/material";


const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const RichTextEditor: React.FC = () => {
    const [content, setContent] = useState<string>("");
    useEffect(() => {
      const storedContent = localStorage.getItem("richTextContent");
      if (storedContent) {
        setContent(storedContent);
      }
    }, []);
  
    // Handle content changes and persist them in localStorage.
    const handleChange = (value: string) => {
      setContent(value);
      localStorage.setItem("richTextContent", value);
    };
  
    return (
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "70vh",
          width: "100%",
          backgroundColor: "#f5f5f5",
          padding: 2
        }}
      >
        <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Rich Text Editor
          </Typography>
  
          {/* ReactQuill Editor with Scrollable Content */}
          <Box 
            sx={{ 
              height: "400px", 
              overflow: "hidden", 
              border: "1px solid #ccc", 
              borderRadius: "5px",
              "& .ql-container": { height: "350px", overflowY: "auto" } // Makes the editor scrollable
            }}
          >
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleChange}
              placeholder="Start writing here..."
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline", "strike"],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </Box>
        </Paper>
      </Box>
    );
  };
  
  export default RichTextEditor;