type CommentsListProps = {
  comments: {
    username: string;
    text: string;
  }[];
};
type Comment = { 
  username: string;
  text: string;
};

export default function CommentsList({comments}: CommentsListProps){
  return(
    <>
    <h3 className="text-xl font-bold">Comments:</h3>
    {comments.length === 0 ? (
      <p>No comments yet. Be the first to comment!</p>
    ) : (
      <div className="m-8">
      {comments.map((c: Comment) => (
        <div className="rounded-md m-4 p-4 text-left border-1" key={c.text}>
          <p>{c.text}</p>
          <p><i>by {c.username}</i></p>
          </div>
    ))}</div>)}
    </>
  )
}