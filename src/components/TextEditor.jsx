import React, { useMemo } from "react";
// import { FiAlignLeft, FiAlignRight, FiAlignCenter } from "react-icons/fi";
// import image from "../../assets/images/Lungs.svg";
import {
    Heading,
    CodeBlock,
  ClassicEditor,
  Context,
  Bold,
  Essentials,
  Strikethrough,
  Italic,
  Subscript,
  Superscript,
  Underline,
  Paragraph,
  ContextWatchdog,
  BlockQuote,
  Font,
  FontSize,
  FontColor,
  AutoLink,
  Link,
  List,
  AdjacentListsSupport,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  TableColumnResize,
  Alignment,
  Undo,
  Highlight,
  Indent,
  IndentBlock,
  ImageInsert,
  ImageUpload,
  AutoImage,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
  LinkImage,
  GeneralHtmlSupport,
  PasteFromMarkdownExperimental,
  // SimpleUploadAdapter
  Base64UploadAdapter
} from "ckeditor5";

import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import "ckeditor5/ckeditor5.css";

const TextEditor = ({ value, handleChange }) => {
  console.log(value,"value",handleChange,"handleChange")
  const customColorPalette = [
    {
      color: "#FFC1BD",
      label: "Peach Pink",
    },
    {
      color: "#FFB9D0",
      label: "Soft Blush",
    },
    {
      color: "#F8CFFF",
      label: "Lavender Blush",
    },
    {
      color: "#D1B7FF",
      label: "Soft Lilac",
    },
    {
      color: "#C3CBFF",
      label: "Pale Periwinkle",
    },
    {
      color: "#ACDAFF",
      label: "Sky Blue",
    },
    {
      color: "#D4FFD0",
      label: "Mint Frost",
    },
    {
      color: "#FFF4C3",
      label: "Buttercup Glow",
    },
    {
      color: "#D1FFFD",
      label: "Frosted Aqua",
    },
    {
      color:"#031227",
      label:"black"
    }
  ];
  return (
    <div style={{ fontFamily: "Manrope !important" }}>
      <CKEditorContext context={Context} contextWatchdog={ContextWatchdog}>
        <CKEditor
          editor={ClassicEditor}
          data={value}
          config={{
            forceVisible: true,

            plugins: [
                Heading,
                CodeBlock,
              Essentials,
              Bold,
              Italic,
              Strikethrough,
              Subscript,
              Superscript,
              Underline,
              Paragraph,
              BlockQuote,
              Font,
              Link,
              AutoLink,
              List,
              AdjacentListsSupport,
              Table,
              TableToolbar,
              TableProperties,
              TableCellProperties,
              TableColumnResize,
              Alignment,
              Undo,

              Indent,
              IndentBlock,
              FontSize,
              FontColor,
              ImageInsert,
              ImageUpload,
              AutoImage,
              Image,
              ImageToolbar,
              ImageCaption,
              ImageStyle,
              ImageResize,
              LinkImage,
              GeneralHtmlSupport,
              PasteFromMarkdownExperimental,
              // SimpleUploadAdapter,
              Base64UploadAdapter
      
            ],
            toolbar: {
              items: [
                "heading",
                "codeBlock",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "subscript",
                "superscript",
                "|",
                "blockQuote",
                "fontSize",

                // "fontFamily",
                "fontColor",
                "fontBackgroundColor",
                "|",
                "image",
                "imageInsert",

                "link",
                "insertTable",
                "|",
                "bulletedList",
                "numberedList",

                "undo",
                "redo",

                "|",
                "alignment",
                "outdent",
                "indent",
              ],
            },
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                ]
            },
            codeBlock: {
                languages: [
                    { language: 'javascript', label: 'JavaScript', class: 'js-code' },
                    { language: 'python', label: 'Python', class: 'python-code' }
                ]
            },
            fontSize: {
              options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
            },
            fontFamily: {
              options: ["default", "Manrope"],
              // supportAllValues: true,
            },
            // simpleUpload: {
            //   // Provide the upload URL where the server will handle image uploads
            //   uploadUrl: "https://your-server.com/upload",
            //   // Optional headers to include in the upload request
            //   headers: {
            //     Authorization: "Bearer <your-token>",
            //   },
            // },

            image: {
              insert: {
                integrations: ["assetManager", "url","upload"],
              },
            },
            list: {
              properties: {
                styles: true,
                startIndex: true,
                reversed: true,
              },
            },
            table: {
              contentToolbar: [
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "tableProperties",
                "tableCellProperties",
              ],
              tableProperties: {
                borderColors: customColorPalette,
                backgroundColors: customColorPalette,
              },
              defaultProperties: {
                borderStyle: "solid",
                borderColor: "#031227",
                borderWidth: "1px",
                alignment: "left",
                width: "550px",
                height: "450px",
              },
              tableCellProperties: {
                borderColors: customColorPalette,
                backgroundColors: customColorPalette,
                
              },
            },
         
            height: "30px",
            overflowY: "auto",
            htmlSupport: {
              allow: [
                {
                  name: "font-family",
                  attributes: ["style"],
                  classes: ["ck-font-monospace", "ck-font-arial"],
                  styles: ["font-family", "font-weight"],
                  callback: function (element) {
                    if (
                      element.styles["font-family"] === "monospace" ||
                      element.styles["font-family"] === "arial"
                    ) {
                      element.styles["font-family"] = "Manrope";
                    }
                  },
                },
              ],
            },
          }}
          onReady={(editor) => {
            console.log("Editor 1 is ready to use!", editor);
          }}
       
          onBlur={(event, editor) => {
            handleChange( event,editor.getData());
          }}
          onChange={(event, editor) => {
            console.log(editor.getData());
            handleChange(event,editor.getData());
          }}
          // setData={(data) => {
          //   console.log(data,"data");
          //   handleChange(null,data);
          // }}
        />
      </CKEditorContext>
    </div>
  );
};

export default TextEditor;