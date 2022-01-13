export default function Http502() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <span className="text-2xl text-gray-700 font-semibold pb-10">
          502 error
        </span>
        <span>서버와 연결할 수 없습니다.</span>
        <span>잠시후 재시도 합니다</span>
      </div>
    </>
  );
}
