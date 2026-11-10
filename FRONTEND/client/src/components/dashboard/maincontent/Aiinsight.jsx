import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

function Aiinsight() {
    const [report, setReport] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const generateReport = async () => {
        try {
            setLoading(true);
            setError('');

            const res = await api.post('/user/ai/generate');

            console.log("AI RESPONSE:", res.data);

            setReport(res.data.report);

        } catch (err) {
            console.error("AI ERROR:", err.response?.data || err.message);
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        generateReport();
    }, []);

    return (
        <div className="bg-slate-900/70 rounded-2xl border border-purple-500/20 backdrop-blur-md shadow-xl p-5">

            <h1 className="text-purple-400 font-bold">
                AI INSIGHT:
            </h1>

            {loading && <p className="text-white">Generating insights...</p>}

            {error && <p className="text-red-400">{error}</p>}

            {!loading && !error && (
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                    {report}
                </p>
            )}

        </div>
    );
}

export default Aiinsight;