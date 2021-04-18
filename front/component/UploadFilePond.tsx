import React, { forwardRef, useEffect, useRef, useState } from "react";

import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";
import FilePondPluginFileRename from "filepond-plugin-file-rename";
import { logger } from "../util/logger";

registerPlugin(FilePondPluginFileRename);

const UploadFilePond = ({}, ref) => {
  const [files, setFiles] = useState([]);
  const [fileRename, setFileRename] = useState(null);
  useEffect(() => logger(files), [files]);

  // const ref = useRef(null);

  const onRemove = (file) => {
    return files[0];
    logger(file.detail.file);
    logger("filedelete", file.serverId);
    setFiles([]);
  };
  const onImgClick = (e) => {
    logger(e.target);
  };

  return (
    <div className="w-full pt-4">
      <FilePond
        ref={ref}
        files={files}
        allowMultiple={true}
        allowReorder={true}
        maxFiles={3}
        server="/api/upload"
        name="file"
        onupdatefiles={(fileItems) => {}}
        // onremovefile={(e, file) => onRemove(file)}
        onprocessfile={(error, file) => {
          let result = file.serverId.replace(/\{|\}/, "").split(",");
          let res = result.findIndex((item) => item.includes("fileName"));
          const filename = result[res].match(/(?<=:").*?(?=")/)[0];
          setFiles((prev) => prev.concat(filename));
          setFileRename(filename);
          // filename(filename);
        }}
        // TODO renameFunction 은 파일ㅇ 전송이 끝나기전에 호출된다 -> 서버에서 전송받은 파일 이름 바꾸기 방법?
        // fileRenameFunction={(file) => {
        //   const result = `${fileRename}.${file.extension}`;
        //   logger(result);
        //   return result;
        // }}
      />
      {/* // TODO 본문 이미지가 제대로 올라왔는지 확인. 파일 업로드 에러 잡고 삭제 */}
      {/* {files &&
        files?.map((file, index) => (
          <div key={index} className="w-40 h-40">
            <img
              onClick={onImgClick}
              src={`/uploads/${file}`}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))} */}
    </div>
  );
};

export default forwardRef(UploadFilePond);
