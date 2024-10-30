import React from "react";

const About = () => {
  return (
    <div className="container">
      <div className="row">
        <h2>ABOUT</h2>
      </div>

      <div className="row">
        <img
          src="https://cdn.racingnews365.com/_1092x683_crop_center-center_85_none/7611259/XPB_1010251_HiRes.webp?v=1709129947"
          alt="f1 cars starting the race at the Singapore GP"
        />
      </div>
      <br />

      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <p>
            This page was created because of my group of friends love for trivia
            about F1! Using this page, perhaps you may find it useful if you
            ever need to pull out facts of your favourite driver. All you have
            to do is add them to your collection in 'My Drivers' for quick and
            easy access! Cheers!
          </p>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
};

export default About;
