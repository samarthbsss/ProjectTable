import React, { useState, useEffect } from "react";
import '../Css/loading.css'

export function TextRandom() {
  const [messages] = useState([
    "Shits Tragic, didnt find what you looking for",
    "Sorry, no results!",
    "Nothing to see here.",
    "Did not match any fields",
    "hmmmmmmm",
    "Nope its not there",
    "You encountered a wild empty search result! ",
    // Add more funny messages here
    "No results found!",
    "Keep searching, man! You've got this. But not this search result, though."
  ]);

  const [randomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    // Generate a random index to select a random message
    const randomIndex = Math.floor(Math.random() * messages.length);
    setRandomMessage(messages[randomIndex]);
  }, [messages]);

  return (
    <div className="message">
      <p>{randomMessage}</p>
    </div>
  );
  }