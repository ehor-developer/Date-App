import { JSX } from "preact";

export default function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
    return (
        <>
            <div class="w-screen h-70 relative bg-white">
                <img class="w-[818px] h-[70px] left-[659px] top-[4px] absolute" src="https://via.placeholder.com/818x70" />
                <img class=" absolute" src="https://via.placeholder.com/145x35" />
            </div>
        </>
    );
}
