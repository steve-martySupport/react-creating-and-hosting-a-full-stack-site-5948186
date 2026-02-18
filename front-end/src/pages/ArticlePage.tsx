import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom"
import articles from '../article-content';
import axios from 'axios';
import CommentsList from "../CommentsList";
import AddCommentForm from "../AddCommentForm";

type Article = {
  name: string;
  title: string;
  content: string[];
};

export default function ArticlePage(){
  const {name} = useParams();
  const {upvotes, comments:initialComments} = useLoaderData();
  const [updatedUpvotes, setUpdatedUpvotes] = useState(upvotes);
  const [updatedComments, setUpdatedComments] = useState(initialComments);
  const article = articles.find((a:Article) => a.name === name);
  async function onUpvoteClicked() {
    const response = await axios.post(`/api/articles/${name}/upvote`);
    const updatedUpvotes = response.data;
    // Update the upvotes in the component state
    setUpdatedUpvotes(updatedUpvotes.upvotes);
    // This will trigger a re-render with the new upvote count
    // You can use a state management solution like useState or useReducer to manage this state
  } 
  async function onAddComment({username, text}: {username: string, text: string}) {
    const response = await axios.post(`/api/articles/${name}/add-comment`, {username, text});
    const updatedComments = response.data.article;
    // Update the comments in the component state
    setUpdatedComments(updatedComments.comments);
    // This will trigger a re-render with the new comments list
  }
  
  return(
    <>
    <h1>{article?.title}</h1>
    {article?.content.map((p: string) => <p key={p}>{p}</p>)}
    <button onClick={onUpvoteClicked}>Upvote</button>
    <p>This article has {updatedUpvotes} upvotes</p>
    <AddCommentForm onAddComment={onAddComment} />
        <CommentsList comments={updatedComments} />

</>
  )
}

export async function loader({params}: {params: {name: string}}) {
  const response = await axios.get(`/api/articles/${params.name}`);
  const {upvotes, comments} = response.data;
  return {upvotes, comments};
}