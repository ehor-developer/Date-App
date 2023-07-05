import Head from "../components/Head.tsx"

export default function index() {
    return (
        <>
            <Head></Head>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <p class="text-3xl m-4 font-bold">使うアプリを選んで！</p>
                <a href="/meet" className="mb-4">
                    <img src="img/出会って.png"  className="w-60 object-contain cursor-pointer rounded-xl" />
                    <p class="text-center m-3 font-bold">出会って何日かを調べるアプリ</p>
                </a>
                
                <a href="/love" className="mb-4">
                    <img src="img/恋.png" className="w-60 object-contain cursor-pointer rounded-xl" />
                    <p class="text-center m-3 font-bold">恋して何日かを調べるアプリ</p>
                </a>
                <a href="/favorite" className="mb-4">
                    <img src="img/推して.png" className="w-60 object-contain cursor-pointer rounded-xl" />
                    <p class="text-center m-3 font-bold">推して何日かを調べるアプリ</p>
                </a>
            </div>
        </>
    );
}
