import { Link } from "react-router-dom";

interface Article {
  name: string;
  title: string;
  content: string[];
}

export default function ArticleList({articles}: {articles: Article[]}) {

  return (
    <>
    {articles.map((a:any) => (
  <Link to={`/articles/${a.name}`}>
    <h3>{a.title}</h3>
    <p>{a.content[0].substring(0,150)}...</p>
  </Link>
  
))}
    </>
  )

}