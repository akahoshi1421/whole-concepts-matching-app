import { Buttons } from "./components/Buttons";

function App() {
  return (
    <>
      <h1>全概念専用マッチングアプリ</h1>

      <Buttons />

      <hr />

      <footer>
        <p>inspired by</p>
        <ul>
          <li>
            <a href="https://uec-matching.mimifuwacc.workers.dev/">
              電通大生専用マッチングアプリ
            </a>
          </li>
          <li>
            <a href="https://human-matching.vercel.app/">
              人類専用マッチングアプリ
            </a>
          </li>
          <li>
            <a href="https://horicun.moo.jp/contents/haiku/">
              全俳句データベース
            </a>
          </li>
        </ul>
        <p>
          <a href="https://github.com/akahoshi1421/whole-concepts-matching-app">
            GitHub
          </a>
        </p>
        <p>&copy; {new Date().getFullYear()} akahoshi1421</p>
      </footer>
    </>
  );
}

export default App;
