import { useState, useEffect } from 'preact/hooks';

export default function Home() {
    const [startDate, setStartDate] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [elapsedDays, setElapsedDays] = useState(0);
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
        const anniversaryDate = getCustomCookie('customAnniversaryDate');
        if (anniversaryDate) {
            setStartDate(new Date(anniversaryDate));
        }
    }, []);

    useEffect(() => {
        if (startDate && isRecording) {
            const diff = Math.floor((currentTime - startDate) / (1000 * 60 * 60 * 24));
            setElapsedDays(diff);
        }
    }, [startDate, currentTime, isRecording]);

    function getCustomCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift().trim();
    }

    function setCustomCookie(name, value, days) {
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
            setCustomCookie('customAnniversaryDate', startDate.toISOString(), 365);
        }
    }

    function handleAnniversaryChange() {
        const anniversaryDate = prompt('日付を入力 (YYYY-MM-DD):');
        if (anniversaryDate) {
            const startDate = new Date(anniversaryDate);
            if (!isNaN(startDate)) {
                setStartDate(startDate);
                setCustomCookie('customAnniversaryDate', startDate.toISOString(), 365);
            }
        }
    }

    function handleGoodbye() {
        setIsRecording(false);
        setCustomCookie('customEndDate', currentTime.toISOString(), 365);
    }

    function handleReset() {
        setIsRecording(true);
        setStartDate(null);
        setElapsedDays(0);
        document.cookie = 'customAnniversaryDate=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'customEndDate=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    return (
        <div className="container mx-auto px-4 py-8 m-auto flex item-center justify-center">
            <div className="bg-white p-10 rounded-xl">
                <h1 className="text-4xl font-bold mb-8 text-blue-600">推して何日？</h1>
                {startDate ? (
                    <div className="text-5xl mb-4 font-bold text-blue-600">
                        {elapsedDays}<span className="text-2xl">日</span>
                    </div>
                ) : (
                    <>
                        <input type="date" value={startDate} onChange={handleStartDateChange} className="p-2 mb-2" />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAnniversaryChange}>記念日を設定</button>
                    </>
                )}

                {startDate && (
                    <div className="flex mt-4">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleGoodbye}>推しとのお別れ</button>
                        {!isRecording && <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleReset}>そうする！</button>}
                    </div>
                )}
            </div>
        </div>
    );
}
