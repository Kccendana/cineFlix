import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        movies: resolve(__dirname, "src/movies/index.html"),
        mylist: resolve(__dirname, "src/mylist/index.html"),
        movieDetail: resolve(__dirname, "src/movie_detail/index.html"),
      },
    },
  },
});
