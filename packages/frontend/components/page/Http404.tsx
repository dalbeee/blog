export default function Http404() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <span className="text-2xl text-gray-700 font-semibold pb-10">
          404 error
        </span>
        <span>페이지를 찾을 수 없습니다.</span>
      </div>
    </>
  );
}
