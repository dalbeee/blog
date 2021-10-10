import { GetServerSideProps } from "next";
import CardMain from "../component/CardMain";
import useNotion from "../hooks/useNotion";

export const getServerSideProps: GetServerSideProps = async () => {
  const notionAPI = useNotion();
  const queryResult = await notionAPI.getPosts(
    "4a31fcbc35a14835a01cbdb421525d09"
  );

  return { props: { queryResult } };
};

const testdb = ({ queryResult }) => {
  console.log(queryResult);
  return (
    <>
      {queryResult.map((item) => {
        return (
          <div key={item.id} className="w-full h-48">
            <CardMain post={item} />
          </div>
        );
      })}
    </>
  );
};

export default testdb;
