import { useEffect, useState } from "react";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import CreateNew from "./components/CreateNew";
import { About } from "./components/About";
import Footer from "./components/Footer";

const Notification = ({ notification }) => {
  if (notification === null) return null;

  return (
    <div className="container">
      {notification && <Alert severity="success">{notification}</Alert>}
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more information see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <a href={`/anecdotes/${anecdote.id}`}>
          <li key={anecdote.id}>{anecdote.content}</li>
        </a>
      ))}
    </ul>
  </div>
);

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  const [notification, setNotification] = useState("");
  const padding = {
    padding: 5,
  };

  const navigate = useNavigate();

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    navigate("/");
    setNotification(`A new anecdote ${anecdote.content} created!`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification} />
      <div>
        <Link style={padding} to={"/"}>
          anecdotes
        </Link>
        <Link style={padding} to={"/create"}>
          create new
        </Link>
        <Link style={padding} to={"/about"}>
          about
        </Link>
      </div>
      <Routes>
        <Route path={"/"} element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path={"/anecdotes/:id"}
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path={"/create"} element={<CreateNew addNew={addNew} />} />
        <Route path={"/about"} element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
