"use client";

import { useState, useEffect } from 'react';
import MoodSelector from './MoodSelector';
import MosaicGrid from './MosaicGrid';

const colorSchemes = {
  default: {
    Amazing: "#FFBF1C",
    Great: "#CAAB5E",
    Neutral: "#9497A0",
    Bad: "#716D7A",
    Awful: "#4D4254",
  },
  pastel: {
    Amazing: "#FFE1F9",
    Great: "#FFD2CD",
    Neutral: "#FFC3A0",
    Bad: "#FFB7A6",
    Awful: "#FFABAB",
  },
  dark: {
    Amazing: "#FFD493",
    Great: "#C09F6F",
    Neutral: "#806A4A",
    Bad: "#403525",
    Awful: "#000000",
  },
  classic: {
    Amazing: "#248C39",
    Great: "#72B55B",
    Neutral: "#D0B142",
    Bad: "#CB8841",
    Awful: "#B63737",
  },
  magic: {
    Amazing: "#D062D8",
    Great: "#AB51B6",
    Neutral: "#853F93",
    Bad: "#602D71",
    Awful: "#3A1B4E",
  },
  amber: {
    Amazing: "#FFC569",
    Great: "#FFAD37",
    Neutral: "#FF9505",
    Bad: "#E2711D",
    Awful: "#CC5803",
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
      <MoodSelector onSelectMood={handleMoodSelect} onSchemeChange={handleSchemeChange} />
      <MosaicGrid moods={moods} colorScheme={colorSchemes[selectedScheme]} onDaySelect={setSelectedDay} />
      {selectedDay && <p>Editing mood for {selectedDay}. Select a mood.</p>}
    </div>
  );
}