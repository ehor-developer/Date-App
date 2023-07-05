import { useState, useEffect } from 'preact/hooks';

export default function Home() {
    const [startDate, setStartDate] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [elapsedYears, setElapsedYears] = useState(0);
    const [elapsedDays, setElapsedDays] = useState(0);
    const [elapsedHours, setElapsedHours] = useState(0);
    const [elapsedMinutes, setElapsedMinutes] = useState(0);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [isRecording, setIsRecording] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const anniversaryDate = getCookie('anniversaryDate');
        if (anniversaryDate) {
            setStartDate(new Date(anniversaryDate));
        }
    }, []);

    useEffect(() => {
        if (startDate && isRecording) {
            const diff = Math.floor((currentTime - startDate) / 1000);
            const years = Math.floor(diff / (365 * 24 * 60 * 60));
            const days = Math.floor((diff % (365 * 24 * 60 * 60)) / (24 * 60 * 60));
            const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((diff % (60 * 60)) / 60);
            const seconds = diff % 60;

            setElapsedYears(years);
            setElapsedDays(days);
            setElapsedHours(hours);
            setElapsedMinutes(minutes);
            setElapsedSeconds(seconds);
        }
    }, [startDate, currentTime, isRecording]);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift().trim();
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};  path=/`;
    }

    function handleStartDateChange(event) {
        const anniversaryDate = event.target.value;
        const startDate = new Date(anniversaryDate);
        if (!isNaN(startDate)) {
            setStartDate(startDate);
            setCookie('anniversaryDate', startDate.toISOString(), 365);
        }
    }

    function handleAnniversaryChange() {
        const anniversaryDate = prompt('Enter the anniversary date (YYYY-MM-DD):');
        if (anniversaryDate) {
            const startDate = new Date(anniversaryDate);
            if (!isNaN(startDate)) {
                setStartDate(startDate);
                setCookie('anniversaryDate', startDate.toISOString(), 365);
            }
        }
    }

    function handleGoodbye() {
        setIsRecording(false);
        setCookie('endDate', currentTime.toISOString(), 365);
    }

    function handleReset() {
        setIsRecording(true);
        setStartDate(null);
        setElapsedYears(0);
        setElapsedDays(0);
        setElapsedHours(0);
        setElapsedMinutes(0);
        setElapsedSeconds(0);
        document.cookie = 'anniversaryDate=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'endDate=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    return (
        <div className="container mx-auto px-4 py-8  m-auto flex item-center justify-center">
            <div className="bg-white p-10 rounded-xl">
                <h1 className="text-4xl font-bold mb-8 text-pink-600">付き合って何日？</h1>
                {startDate ? (
                    <div className="text-5xl mb-4 font-bold text-pink-600">
                        {elapsedYears}<span className="text-2xl">年</span>{elapsedDays}<span className="text-2xl">日</span>{elapsedHours}<span className="text-2xl">時間</span>{elapsedMinutes}<span className="text-2xl">分</span>{elapsedSeconds}<span className="text-2xl">秒</span>
                    </div>
                ) : (
                    <>
                        <input type="date" value={startDate} onChange={handleStartDateChange} className="p-2 mb-2" />
                        <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={handleAnniversaryChange}>記念日を設定する</button>
                    </>
                )}

                {startDate && (
                    <div className="flex mt-4">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleGoodbye}>じゃあねをする。</button>
                        {!isRecording && <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleReset}>本当にいいの？</button>}
                    </div>
                )}
            </div>
        </div>
    );
}
