import React, { useState } from 'react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState(1)


    const SettingsTabs = [{ id: 1, tab: "Hero Slider" }, { id: 2, tab: "About Us" }, { id: 3, tab: "Contact Us" }, { id: 4, tab: "Footer" }, { id: 5, tab: "Social Media Links" }]



    return (
        <div className='w-full '>
            {/* top links */}
            <div className='w-full flex items-center justify-start gap-5 border-b-2 border-gray-300 mb-5'>
                {SettingsTabs.map((item) => (
                    <button onClick={() => setActiveTab(item.id)} className={`py-2 px-4 ${activeTab === item.id ? "border-b-2 border-blue-500 text-blue-500 bg-white/10" : "text-gray-500"}`} key={item.id}>{item.tab}</button>
                ))}
            </div>

            {/* content area------> */}

            {
                activeTab === 1 && <div>Hero Slider Content</div>
            }
            {
                activeTab === 2 && <div>About Us Content</div>


            }
            {
                activeTab === 3 && <div>Contact Us Content</div>
            }
            {
                activeTab === 4 && <div>Footer Content</div>
            }
            {
                activeTab === 5 && <div>Social Media Links Content</div>
            }

        </div>
    );
};

export default Settings;