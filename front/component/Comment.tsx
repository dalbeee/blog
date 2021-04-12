import { CommentDTO } from "..";

const CommentChild = ({ comment }: { comment: CommentDTO }) => {
  return (
    <div className="flex items-center py-2">
      <div className="p-1 mr-2 text-gray-700 bg-gray-300 rounded-lg">
        {comment?.user.username}
      </div>
      <div className="">{comment.body}</div>
    </div>
  );
};

const Comment = ({ comments }) => {
  return (
    <div className="flex flex-col text-gray-700 border-t-2">
      <div className="text-2xl font-semibold">comments👀</div>
      <div className="">
        {!!comments.length ? (
          comments.map((comment, index) => (
            <CommentChild comment={comment} key={index} />
          ))
        ) : (
          <div>코멘트가 아직 없어요!</div>
        )}
      </div>
    </div>
  );
};

export default Comment;
