
import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

function Aiinsight() {

    const [insight, setInsight] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const generateReport = async () => {
        try {
            setLoading(true);
            setError('');

            const res = await api.post('/user/ai/generate');

            setInsight(res.data.insight);
            setStats(res.data.stats);

        } catch (err) {
            console.error(
                "AI ERROR:",
                err.response?.data || err.message
            );

            setError(
                err.response?.data?.error ||
                "Unable to generate AI insights."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        generateReport();
    }, []);

    // Convert seconds into readable hours and minutes
    const formatStudyTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (hours === 0) return `${minutes}m`;
        if (minutes === 0) return `${hours}h`;

        return `${hours}h ${minutes}m`;
    };

    const progress = stats?.dailyGoalHours > 0
        ? Math.min(
            (stats.totalStudyTimeSeconds /
                (stats.dailyGoalHours * 3600)) * 100,
            100
        )
        : 0;

    return (
        <div className="bg-slate-900/80 border border-purple-500/20
            rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md
            space-y-6 text-slate-100">

            {/* HEADER */}
            <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl
                        bg-purple-500/15 border border-purple-400/20
                        flex items-center justify-center text-xl">
                        ✨
                    </div>

                    <div>
                        <h2 className="font-bold text-lg text-purple-300">
                            AI Study Insights
                        </h2>

                        <p className="text-xs text-slate-400">
                            Your personal productivity assistant
                        </p>
                    </div>

                </div>

                <button
                    onClick={generateReport}
                    disabled={loading}
                    className="px-3 py-2 rounded-lg text-xs font-semibold
                    bg-purple-500/10 text-purple-300
                    border border-purple-500/20
                    hover:bg-purple-500/20
                    disabled:opacity-50 transition"
                >
                    {loading ? "Generating..." : "↻ Refresh"}
                </button>

            </div>


            {/* LOADING STATE */}
            {loading && (
                <div className="py-12 flex flex-col items-center
                    justify-center gap-3">

                    <div className="w-8 h-8 border-2
                        border-purple-400 border-t-transparent
                        rounded-full animate-spin" />

                    <p className="text-sm text-slate-400">
                        Analyzing your study activity...
                    </p>

                </div>
            )}


            {/* ERROR STATE */}
            {!loading && error && (
                <div className="bg-red-500/10 border border-red-500/20
                    rounded-xl p-4 space-y-3">

                    <p className="text-red-400 text-sm">
                        {error}
                    </p>

                    <button
                        onClick={generateReport}
                        className="text-sm text-red-300 underline"
                    >
                        Try again
                    </button>

                </div>
            )}


            {/* MAIN CONTENT */}
            {!loading && !error && insight && stats && (

                <>

                    {/* AI SUMMARY */}
                    <div className="rounded-xl p-5
                        bg-gradient-to-br from-purple-600/20
                        via-indigo-500/10 to-slate-900
                        border border-purple-400/20 space-y-2">

                        <p className="text-xs uppercase tracking-widest
                            text-purple-300 font-semibold">
                            Today's feedback
                        </p>

                        <h3 className="text-xl font-bold text-white">
                            {insight.headline}
                        </h3>

                        <p className="text-sm text-slate-300
                            leading-7">
                            {insight.summary}
                        </p>

                    </div>


                    {/* STATISTICS */}
                    <div className="grid grid-cols-3 gap-3">

                        <div className="bg-slate-800/80
                            border border-slate-700/60
                            rounded-xl p-3">

                            <p className="text-xl mb-2">◷</p>

                            <h3 className="text-lg sm:text-xl
                                font-bold text-white">
                                {formatStudyTime(
                                    stats.totalStudyTimeSeconds
                                )}
                            </h3>

                            <p className="text-xs text-slate-400">
                                Study time
                            </p>

                        </div>


                        <div className="bg-slate-800/80
                            border border-slate-700/60
                            rounded-xl p-3">

                            <p className="text-xl mb-2">📚</p>

                            <h3 className="text-lg sm:text-xl
                                font-bold text-white">
                                {stats.totalSessions}
                            </h3>

                            <p className="text-xs text-slate-400">
                                Sessions
                            </p>

                        </div>


                        <div className="bg-slate-800/80
                            border border-slate-700/60
                            rounded-xl p-3">

                            <p className="text-xl mb-2">🎯</p>

                            <h3 className="text-lg sm:text-xl
                                font-bold text-white">
                                {stats.dailyGoalHours}h
                            </h3>

                            <p className="text-xs text-slate-400">
                                Daily goal
                            </p>

                        </div>

                    </div>


                    {/* PROGRESS BAR */}
                    <div className="space-y-2">

                        <div className="flex justify-between
                            text-sm">

                            <span className="text-slate-300">
                                Daily goal progress
                            </span>

                            <span className="text-purple-300 font-semibold">
                                {Math.round(progress)}%
                            </span>

                        </div>

                        <div className="h-2.5 w-full bg-slate-700
                            rounded-full overflow-hidden">

                            <div
                                className="h-full bg-gradient-to-r
                                from-purple-500 to-indigo-400
                                rounded-full transition-all duration-700"
                                style={{
                                    width: `${progress}%`
                                }}
                            />

                        </div>

                        <p className="text-xs text-slate-500">
                            {formatStudyTime(
                                stats.totalStudyTimeSeconds
                            )} of {stats.dailyGoalHours} hours completed
                        </p>

                    </div>


                    {/* ACTION PLAN */}
                    <div className="space-y-4">

                        <div>
                            <h3 className="font-bold text-white">
                                Your action plan
                            </h3>

                            <p className="text-xs text-slate-400 mt-1">
                                Small steps to improve your productivity
                            </p>
                        </div>


                        <div className="space-y-3">

                            {insight.actionPlan.map((action, index) => (

                                <div
                                    key={index}
                                    className="flex items-start gap-3
                                    p-3 rounded-xl bg-slate-800/60
                                    border border-slate-700/50
                                    hover:border-purple-500/30
                                    transition"
                                >

                                    <div className="w-8 h-8 shrink-0
                                        rounded-lg bg-purple-500/15
                                        text-purple-300
                                        flex items-center justify-center
                                        text-sm font-bold">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    <div className="space-y-1">

                                        <h4 className="text-sm
                                            font-semibold text-slate-100">
                                            {action.title}
                                        </h4>

                                        <p className="text-xs
                                            leading-6 text-slate-400">
                                            {action.reason}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* ENCOURAGEMENT */}
                    <div className="border-t border-slate-700/70
                        pt-4">

                        <p className="text-xs uppercase
                            tracking-widest text-purple-400
                            font-semibold mb-2">
                            A little reminder
                        </p>

                        <p className="text-sm text-slate-300
                            leading-7 italic">
                            "{insight.encouragement}"
                        </p>

                    </div>

                </>

            )}

        </div>
    );
}

export default Aiinsight;
