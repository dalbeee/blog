import React, { useEffect, useState } from "react";

import { FilePond } from "react-filepond";

import "filepond/dist/filepond.min.css";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// // Import the Image EXIF Orientation and Image Preview plugins
// // Note: These need to be installed separately
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app

const UploadFilePond = () => {
  //   const [files, setFiles] = useState([]);
  const [files, setFiles] = useState([]);
  useEffect(() => console.log(files), [files]);
  //   const ref = useRef(null);

  const handleInit = () => {
    console.log("FilePond instance has initialised");
  };

  const onRemove = (e) => {
    console.log(e.detail.file);
  };
  return (
    <div className="w-full py-4">
      <FilePond
        // ref={ref}
        files={files}
        allowMultiple={true}
        allowReorder={true}
        maxFiles={3}
        server="/api/upload"
        name="file"
        oninit={() => handleInit()}
        // onupdatefiles={(fileItems) => {
        //   // Set currently active file objects to state
        //   console.log(fileItems);
        //   setFiles(fileItems.map((fileItem) => fileItem.file));
        // }}

        // onaddfile={(e, file) => {
        //   console.log("onadd");

        //   // if (!file) return;
        //   let res = file.serverId;
        //   res = res && res.replace("\\", "");
        //   console.log(res);

        //   const result = JSON.parse(res);
        //   console.log(result);
        // }}

        // onupdatefiles={(file) => {
        //   console.log(">>>", file);
        //   const res = JSON.parse(file?.[0]?.serverId);
        //   console.log(res);
        //   setFiles(file);
        // }}
        // onupdatefiles={setFiles}
        // onremovefile={onRemove}

        // beforeRemoveFile={(file) => {
        //   console.log(file.serverId); // string 에 객체가 들어있다
        //   // item.
        //   return new Promise((resolve, rej) => {
        //     let result = file.serverId.replace(/\{|\}/, "").split(",");
        //   let res = result.findIndex((item) => item.includes("filename"));
        //   const filename = result[res].match(/(?<=:").*?(?=")/)[0];
        //   // resolve()
        //   });
        // }}

        // onremovefile={(e, file) => {
        //   console.log("filedelete", file.serverId);
        //   setFiles([]);
        // }}
        // onprocessfile={(error, file) => {
        //   let result = file.serverId.replace(/\{|\}/, "").split(",");
        //   let res = result.findIndex((item) => item.includes("filename"));
        //   const filename = result[res].match(/(?<=:").*?(?=")/)[0];
        //   // console.log(result, res, filename);
        //   // file.filename = filename;
        // }}
      />
    </div>
  );
};

export default UploadFilePond;
