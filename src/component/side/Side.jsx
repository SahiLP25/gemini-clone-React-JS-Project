import React, { useContext, useState } from "react";
import "./Side.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Side = () => {
  const [extend, setExtend] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtend((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
      
        {extend && (
          <div className="recent">
            <p className="recenttittle">Recent</p>
            {prevPrompt && prevPrompt.length > 0 ? (
              prevPrompt.map((item, index) => (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="recententry"
                >
                  <img src={assets.message_icon} alt="Message Icon" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              ))
            ) : (
              <p>No recent prompts</p>
            )}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottomitem recententry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extend ? <p>Help</p> : null}
        </div>
        <div className="bottomitem recententry">
          <img src={assets.history_icon} alt="Activity Icon" />
          {extend ? <p>Activity</p> : null}
        </div>
        <div className="bottomitem recententry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extend ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Side;
