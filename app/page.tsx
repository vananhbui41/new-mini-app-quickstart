"use client";
import { useState, useEffect } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import styles from "./page.module.css";

interface Mood {
  name: string;
  icon: string;
  color: string;
}

interface Quote {
  text: string;
  mood: string;
}

const moods: Mood[] = [
  { name: "Happy", icon: "😊", color: "#FFD700" },
  { name: "Sad", icon: "😢", color: "#4169E1" },
  { name: "Angry", icon: "😠", color: "#FF4500" },
  { name: "Neutral", icon: "😐", color: "#808080" },
  { name: "Excited", icon: "🤩", color: "#FF1493" },
  { name: "Calm", icon: "😌", color: "#90EE90" },
];

const quotes: Record<string, string[]> = {
  Happy: [
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Happiness is not by chance, but by choice.",
    "Life is 10% what happens to you and 90% how you react to it.",
    "Keep smiling, because life is a beautiful thing and there's so much to smile about.",
    "Be yourself; everyone else is already taken.",
  ],
  Sad: [
    "The wound is the place where the Light enters you.",
    "Sadness is just love with no place to go.",
    "Everything you want is on the other side of fear.",
    "You are stronger than you believe, braver than you seem, and smarter than you think.",
    "This too shall pass.",
  ],
  Angry: [
    "Anger is just sad's bodyguard.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "You cannot control the wind, but you can adjust your sails.",
    "Peace comes from within. Do not seek it without.",
    "The obstacle is the way.",
  ],
  Neutral: [
    "In the middle of difficulty lies opportunity.",
    "Everything has beauty, but not everyone can see.",
    "The only way to do great work is to love what you do.",
    "Quality is not an act, it is a habit.",
    "Success is a journey, not a destination.",
  ],
  Excited: [
    "The future belongs to those who believe in the beauty of their dreams.",
    "Don't watch the clock; do what it does. Keep going.",
    "The way to get started is to quit talking and begin doing.",
    "Believe you can and you're halfway there.",
    "Your time is limited, don't waste it living someone else's life.",
  ],
  Calm: [
    "Peace is a journey of a thousand miles and it must be taken one step at a time.",
    "Breathe. You are exactly where you need to be.",
    "In a gentle way, you can shake the world.",
    "The present moment is the only moment available to us.",
    "Let it go and be at peace.",
  ],
};

export default function Home() {
  const { isFrameReady, setFrameReady } = useMiniKit();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [quote, setQuote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the  miniapp
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleMoodClick = async (moodName: string) => {
    setSelectedMood(moodName);
    setIsLoading(true);

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    const moodQuotes = quotes[moodName];
    const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
    setQuote(randomQuote);
    setIsLoading(false);
  };

  const handleChooseAgain = () => {
    setQuote(null);
    setSelectedMood(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!selectedMood ? (
          <>
            <h1 className={styles.questionTitle}>How do you feel today?</h1>
            <div className={styles.moodsGrid}>
              {moods.map((mood) => (
                <button
                  key={mood.name}
                  className={styles.moodButton}
                  onClick={() => handleMoodClick(mood.name)}
                  style={
                    {
                      "--mood-color": mood.color,
                    } as React.CSSProperties
                  }
                >
                  <span className={styles.moodIcon}>{mood.icon}</span>
                  <span className={styles.moodLabel}>{mood.name}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className={`${styles.quoteContainer} ${quote ? styles.quoteVisible : ""}`}>
            {isLoading ? (
              <div className={styles.loader}></div>
            ) : (
              <>
                <div className={styles.quoteContent}>
                  <span className={styles.quoteIcon}>✨</span>
                  <p className={styles.quoteText}>{quote}</p>
                  <span className={styles.quoteIcon}>✨</span>
                </div>
                <button className={styles.chooseAgainButton} onClick={handleChooseAgain}>
                  Choose Again
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
