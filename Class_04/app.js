﻿import fileService from "./file-service.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import emmiter from "./event-service.js";

export const addMovie = (movieName) => {
  const movies = fileService.readFromFile("./db/movies.json");
  // console.log(movies);
  const movie = {
    id: uuidv4(),
    name: movieName,
  };

  movies.push(movie);

  fileService.writeToFile("./db/movies.json", JSON.stringify(movies, null, 2));
  emmiter.emit("movie_added", movie.name);
};

addMovie("Interstellar");
