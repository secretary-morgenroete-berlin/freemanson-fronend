import React from "react";
import './WhatIsFreemasonry.css';

const freimaurerImage =
  "./bg2.jpg"; // Use local if you prefer

export default function WhatIsFreemasonry() {
  return (
    <div>
      <div className="freimaurerei-title">
        What is Freemasonry?
      </div>
      <div className="freimaurerei-section">
        <div className="freimaurerei-text">
          <strong>Freemasonry</strong>, also known as the Royal Art, sees itself as an ethical association of free men with the conviction that constant improvement leads to more humane behavior. Freemasons are committed to secrecy and, in particular, to the principle of not revealing Masonic customs and lodge matters to the outside world. This is referred to as the duty of secrecy, also known as the secret discipline. This also facilitates the internal exchange of ideas and opinions.
        </div>
        <img
          src={freimaurerImage}
          className="freimaurerei-img"
          alt="Freemasonry Symbolism"
        />
        <div className="freimaurerei-text">
          The members call each other brothers. The spiritual idea of brotherhood connects people of all races and nationalities into a global brotherhood. There are well over six million Freemasons throughout the world who, with brotherly love and commitment, work on themselves and on the fraternal, liberal, and international ideal of Freemasonry. <br />
        </div>
        <img
          src={freimaurerImage}
          className="freimaurerei-img"
          alt="Freemasonry Symbolism"
        />
        <div className="freimaurerei-text">
          Freemasonry is a way of life. It is a direction for the righteous life. However, the goal cannot be achieved in a week, a month, or a year. True to the motto: "The path is the destination." The teachings of Freemasonry are so comprehensive and appeal so strongly to the individual that they will ponder them for a lifetime. People also become Freemasons because they want to believe, but cannot believe everything. A Freemason does not strive for complete knowledge, but rather to become essential, in the truest sense of the word.
        </div>
        <div className="freimaurerei-text" style={{ fontStyle: "italic", color: "#654321" }}>
          The history of Freemasonry reaches far back, but its message is timeless. The principles and values of the Freemasons are still relevant today and invite everyone to get involved.
        </div>
      </div>
    </div>
  );
}
