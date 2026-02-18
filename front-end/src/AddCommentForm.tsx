import { useState } from "react";

export default function AddCommentForm({onAddComment}: {onAddComment: (comment: {username: string, text: string}) => void} ) {
  const [username, setUserName] = useState("");
  const [comment, setComment] = useState("");
  
  return (
    <div className="m-8 p-4 flex flex-col text-left">
      <h3 className="text-xl font-bold">Add a Comment</h3>
      <label>Name:
        <input type="text" required className="border-1 p-2 ml-4 rounded-md" name="name" value={username} onChange={(e) => setUserName(e.target.value)} />
      </label>
      <label>Comment:
        <input type="text" required className="border-1 p-2 ml-4 rounded-md" name="comment" value={comment} onChange={e => setComment(e.target.value)} />
      </label>
      <button onClick={() => onAddComment({username, text: comment})}>Add Comment</button>
    </div>
  )}