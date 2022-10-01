import ReactMarkdown from "react-markdown";
import "../styles/default.css";

export default function Score(props: { message: string }) {
  return (
    <ReactMarkdown className="score">{props.message}</ReactMarkdown>
  );
}
