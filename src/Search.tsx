import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchRepositoriesQuery } from "./api";
import './App.css'

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: repositories, isLoading } = useSearchRepositoriesQuery(searchTerm);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => event.preventDefault();

  return (
    <div className='App'>
      <h1>GitHub Repository Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Searching repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {repositories && (
        <ul>
          {repositories.map((repo) => (
            <li key={repo.id}>
              <Link to={`/repo/${repo.owner.login}/${repo.name}`}>
                {repo.full_name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;