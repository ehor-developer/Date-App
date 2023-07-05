import Love from "../islands/love.tsx"
import Head from "../components/Head.tsx"
export default function love() {
  return (
    <>
      <Head></Head>
      <div class="bg-pink-100 h-screen m-auto flex item-center">
        <Love></Love>
      </div>
    </>
  );
}
