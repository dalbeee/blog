import { useEffect, useState } from "react";
import axios from "axios";

const GetUploadedFiles = () => {
  const [data, setData] = useState(null);

  // TODO >> export const getAllFilesPath = async () => await getAxiosData("GET", "/upload");
  const onClick = async () => setData(await axios.get("/upload"));

  useEffect(() => {
    onClick();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={onClick}
        className="p-1 mb-4 bg-gray-700 text-gray-50 rounded-xl"
      >
        refresh
      </button>

      <div className="flex flex-wrap w-4/5 h-3/5">
        {!!data?.length &&
          data.map((d, index) => (
            <div key={index} className="w-1/2 p-4 ">
              <img
                src={`/${d.path}`}
                // layout="fill"
                // objectFit="cover"
                width={300}
                height={300}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default GetUploadedFiles;
