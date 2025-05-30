import { calculateDailyPoints } from '../utils/pointsCalculator';

export const DailyPoints = () => {
  const points = calculateDailyPoints();

  return (
    <div className="daily-points">
      <h2>Daily Points</h2>
      <div className="points">{points}</div>
    </div>
  );
}; 