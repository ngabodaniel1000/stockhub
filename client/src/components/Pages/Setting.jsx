import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Setting({ darkmode, toggleDarkMode }) {
    const [settings, setSettings] = useState({
        darkmode: darkmode,
        stockminlevel: 5,
        language: 'en'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await axios.get('http://localhost:8889/api/settings', {
                withCredentials: true
            });
            if (response.data.success) {
                setSettings(response.data.settings);
            }
        } catch (error) {
            alert('Failed to load settings', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (field, value) => {
        try {
            const updateData = { [field]: value };
            const response = await axios.put(
                'http://localhost:8889/api/settings/update', 
                updateData,
                { withCredentials: true }
            );
            
            if (response.data.success) {
                setSettings(prev => ({ ...prev, [field]: value }));
                
                // If updating darkmode, call the toggle function from parent
                if (field === 'darkmode') {
                    toggleDarkMode(value);
                }
                
                alert('Settings updated successfully', 'success');
            }
        } catch (error) {
            alert('Failed to update settings', 'error');
            console.error('Update error:', error);
        }
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <div className={`min-h-screen p-8 ${settings.darkmode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h1 className="text-3xl font-bold mb-8">Settings</h1>
            
            <div className="max-w-2xl">
                {/* Theme Selection */}
                <div className={`flex items-center justify-between p-4 rounded-lg mb-4 ${settings.darkmode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Theme</h2>
                        <p className={settings.darkmode ? 'text-gray-300' : 'text-gray-600'}>
                            Choose your preferred theme
                        </p>
                    </div>
                    <select 
                        value={settings.darkmode ? 'dark' : 'light'} 
                        onChange={(e) => handleUpdate('darkmode', e.target.value === 'dark')}
                        className={`border rounded-lg p-2 ${settings.darkmode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    >
                        <option value="light">Light Mode</option>
                        <option value="dark">Dark Mode</option>
                    </select>
                </div>

                {/* Stock level Settings */}
                <div className={`flex items-center justify-between p-4 rounded-lg mb-4 ${settings.darkmode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Stock Minimum Level</h2>
                        <p className={settings.darkmode ? 'text-gray-300' : 'text-gray-600'}>
                            Set minimum stock level alert
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            value={settings.stockminlevel}
                            onChange={(e) => setSettings(prev => ({ ...prev, stockminlevel: e.target.value }))}
                            min="1"
                            max="100"
                            className={`border rounded-lg p-2 w-20 ${settings.darkmode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                        />
                        <button 
                            onClick={() => handleUpdate('stockminlevel', settings.stockminlevel)}
                            className={`px-4 py-2 rounded-lg ${settings.darkmode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} hover:opacity-90`}
                        >
                            Update
                        </button>
                    </div>
                </div>

                {/* Language Selection */}
                <div className={`flex items-center justify-between p-4 rounded-lg mb-4 ${settings.darkmode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Language</h2>
                        <p className={settings.darkmode ? 'text-gray-300' : 'text-gray-600'}>
                            Select your preferred language
                        </p>
                    </div>
                    <select 
                        value={settings.language}
                        onChange={(e) => handleUpdate('language', e.target.value)}
                        className={`border rounded-lg p-2 ${settings.darkmode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    >
                        <option value="kny">Kinyarwanda</option>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="ksw">Kiswahili</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Setting;