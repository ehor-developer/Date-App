import Favorite from "../islands/favorite.tsx"
import Head from "../components/Head.tsx"
export default function love() {
  return (
    <>
      <Head></Head>
      <div class="bg-blue-100 h-screen m-auto flex item-center">
        <Favorite></Favorite>
      </div>
    </>
  );
}
