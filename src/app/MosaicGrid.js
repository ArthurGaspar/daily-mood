import styles from './MosaicGrid.module.css';

export default function MosaicGrid({ moods, colorScheme, onDaySelect }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className={styles.gridContainer}>
      <h2>{today.toLocaleString("default", { month: "long" })} {year}</h2>
      <div className={styles.weekdays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={styles.weekday}>{day}</div>
        ))}
      </div>
      <div className={styles.grid}>
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className={styles.emptyCell}></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const mood = moods[`${year}-${month}-${day}`];
          return (
            <div
              key={day}
              className={styles.cell}
              style={{ backgroundColor: mood ? colorScheme[mood] : "#ddd" }}
              onClick={() => onDaySelect(`${year}-${month}-${day}`)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}