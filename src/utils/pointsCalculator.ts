import type { Season, SeasonInfo } from "../types/index";

// const memo = new Map<number, number>();

const POINTS_FORMAT = [
  { threshold: 1_000_000_000, suffix: 'B' },
  { threshold: 1_000_000, suffix: 'M' },
  { threshold: 1_000, suffix: 'K' }
] as const;

export function calculateDailyPoints(targetDate = new Date()) {
  const { dayOfSeason } = getSeasonAndDay(targetDate);
  const points = getPointsForDay(dayOfSeason);
  return formatPoints(points);
}
  
function getSeasonAndDay(date: Date): { season: Season; dayOfSeason: number } {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const SEASONS: SeasonInfo[] = [
    { name: 'spring', start: [3, 1], end: [5, 31] },
    { name: 'summer', start: [6, 1], end: [8, 31] },
    { name: 'autumn', start: [9, 1], end: [11, 30] },
    { name: 'winter', start: [12, 1], end: [2, isLeapYear(year) ? 29 : 28] }
  ];
  
  const season = SEASONS.find((s): boolean => {
  const [startMonth, startDay] = s.start;
  const [endMonth, endDay] = s.end;
      
  return (
    (month === startMonth && day >= startDay) ||
    (month === endMonth && day <= endDay) ||
    (month > startMonth && month < endMonth)
    );
  }) || SEASONS[3];
  
  let seasonStart: Date;
  if (season.name === 'winter' && month <= 2) {
    seasonStart = new Date(year - 1, 11, 1); // Previous year's Dec 1
  } else {
    seasonStart = new Date(year, season.start[0] - 1, season.start[1]);
  }
  
  const timeDiff: number = date.getTime() - seasonStart.getTime();
  const dayOfSeason: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  
  return {
    season: season.name,
    dayOfSeason
  };
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
  
/**
 * Calculates daily points using memoized top-down dynamic programming (recursion with caching).
 * 
 * Time Complexity: O(n) - With memoization, each day is computed only once
 * Space Complexity: O(n) - Call stack depth and memo storage for n days
 * 
 * Base Cases:
 *   - Day 1: 2 points
 *   - Day 2: 3 points
 * Recurrence Relation:
 *   dp(n) = round(dp(n-2) + 0.6 * dp(n-1))
 */
// function getPointsForDay(day: number): number {
//     // Check cache first
//     if (memo.has(day)) return memo.get(day)!;
    
//     // Base cases
//     if (day === 1) return 2;
//     if (day === 2) return 3;
    
//     // Recursive case with memoization
//     const result = Math.round(
//         getPointsForDay(day - 2) + 0.6 * getPointsForDay(day - 1)
//     );
//     memo.set(day, result);
    
//     return result;
// }


/**
 * Calculates daily points using bottom-up dynamic programming.
 * 
 * Time Complexity: O(n) - Single loop through days 3..n
 * Space Complexity: O(n) - DP array stores n values
 * 
 * Base Cases:
 *   - Day 1: 2 points
 *   - Day 2: 3 points
 * Recurrence Relation:
 *   dp[i] = round(dp[i-2] + 0.6 * dp[i-1])
 */
function getPointsForDay(day: number): number {
  const dp = new Array(day + 1);
  dp[1] = 2;
  dp[2] = 3;
    
  for (let i = 3; i <= day; i++) {
    dp[i] = Math.round(dp[i-2] + 0.6 * dp[i-1]);
  }
    
  return dp[day];
}
  
function formatPoints(points: number): string {
  const format = POINTS_FORMAT.find(f => points >= f.threshold);
  if (!format) return points.toString();
    
  const value = points / format.threshold;
  return `${Math.round(value * 10) / 10}${format.suffix}`;
}