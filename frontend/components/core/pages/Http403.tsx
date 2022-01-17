export default function Http403() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <span className="text-2xl text-gray-700 font-semibold pb-10">
          403 error
        </span>
        <span>권한이 없습니다</span>
      </div>
    </>
  );
}
