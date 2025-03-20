"use client";

import { useState, useEffect } from 'react';
import MoodSelector from './MoodSelector';
import MosaicGrid from './MosaicGrid';

const colorSchemes = {
  default: {
    bg: "#f4f4f4",
    text: "#000000",
    dayNumber: "#FFFFFF",
    Amazing: "#FFBF1C",
    Great: "#CAAB5E",
    Neutral: "#9497A0",
    Bad: "#716D7A",
    Awful: "#4D4254",
  },
  pastel: {
    bg: "#f4f4f4",
    text: "#7A4141",
    dayNumber: "#7A4141",
    Amazing: "#FFE1F9",
    Great: "#FFD2CD",
    Neutral: "#FFC3A0",
    Bad: "#FFB7A6",
    Awful: "#FFABAB",
  },
  dark: {
    bg: "#403525",
    text: "#FFD493",
    dayNumber: "#FFFFFF",
    Amazing: "#FFD493",
    Great: "#C09F6F",
    Neutral: "#806A4A",
    Bad: "#403525",
    Awful: "#000000",
  },
  classic: {
    bg: "#f4f4f4",
    text: "#333",
    dayNumber: "#333",
    Amazing: "#248C39",
    Great: "#72B55B",
    Neutral: "#D0B142",
    Bad: "#CB8841",
    Awful: "#B63737",
  },
  magic: {
    bg: "#380B40",
    text: "#FDDFFF",
    dayNumber: "#FDDFFF",
    Amazing: "#D062D8",
    Great: "#AB51B6",
    Neutral: "#853F93",
    Bad: "#602D71",
    Awful: "#3A1B4E",
  },
  amber: {
    bg: "#F8E5C6",
    text: "#333",
    dayNumber: "#333",
    Amazing: "#FFC569",
    Great: "#FFAD37",
    Neutral: "#FF9505",
    Bad: "#E2711D",
    Awful: "#CC5803",
  },
  rank: {
    bg: "#f4f4f4",
    text: "#333",
    dayNumber: "#FFFFFF",
    Amazing: "#9FE3FA",
    Great: "#84E1BD",
    Neutral: "#DFB457",
    Bad: "#C9C9C9",
    Awful: "#7F492A",
  },
  nights: {
    bg: "#714E39",
    text: "#D8B49F",
    dayNumber: "#333",
    Amazing: "#DFB457",
    Great: "#DC9E64",
    Neutral: "#DA969B",
    Bad: "#B97ABB",
    Awful: "#804AB0",
  },
  spirited: {
    bg: "#f4f4f4",
    text: "#333",
    dayNumber: "#333",
    Amazing: "#57DEA8",
    Great: "#81E7BE",
    Neutral: "#ABEFD4",
    Bad: "#D5F7EA",
    Awful: "#FFFFFF",
  },
  rose: {
    bg: "#f4f4f4",
    text: "#333",
    dayNumber: "#333",
    Amazing: "#FF6290",
    Great: "#FF7A9B",
    Neutral: "#FF92AD",
    Bad: "#FFAABF",
    Awful: "#FFC2D1",
  },
};

export default function Home() {
  const [moods, setMoods] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState("default");
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const savedMoods = JSON.parse(localStorage.getItem("moodData")) || [];
    setMoods(savedMoods);

    const savedScheme = localStorage.getItem("selectedMoodScheme") || "default";
    setSelectedScheme(savedScheme);
  }, []);

  useEffect(() => {
    const { bg, text } = colorSchemes[selectedScheme];
    document.body.style.backgroundColor = bg;
    document.body.style.color = text;
  }, [selectedScheme]);

  const handleMoodSelect = (mood) => {
    if (!selectedDay) return;
    const updatedMoods = { ...moods, [selectedDay]: mood };
    setMoods(updatedMoods);
    localStorage.setItem("moodData", JSON.stringify(updatedMoods));
    setSelectedDay(null);
  };

  const handleSchemeChange = (scheme) => {
    setSelectedScheme(scheme);
  };

  return (
    <div>
      <h1>Daily Mood Mosaic</h1>
      <MoodSelector onSelectMood={handleMoodSelect} onSchemeChange={handleSchemeChange} colorScheme={colorSchemes[selectedScheme]} />
      <MosaicGrid moods={moods} colorScheme={colorSchemes[selectedScheme]} onDaySelect={setSelectedDay}/>
      {selectedDay && <p>Editing mood for {selectedDay}. Select a mood.</p>}
    </div>
  );
}