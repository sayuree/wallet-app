// type Season = 'spring' | 'summer' | 'autumn' | 'winter';

// const SEASON_START_DATES: Record<Season, { month: number; day: number }> = {
//   spring: { month: 3, day: 1 },   // March 1
//   summer: { month: 6, day: 1 },   // June 1
//   autumn: { month: 9, day: 1 },   // September 1
//   winter: { month: 12, day: 1 },  // December 1
// };

// const getCurrentSeason = (date: Date): Season => {
//   const month = date.getMonth() + 1; // JavaScript months are 0-based

//   if (month >= 3 && month < 6) return 'spring';
//   if (month >= 6 && month < 9) return 'summer';
//   if (month >= 9 && month < 12) return 'autumn';
//   return 'winter';
// };

// const getDayOfSeason = (date: Date): number => {
//   const season = getCurrentSeason(date);
//   const startDate = new Date(
//     date.getFullYear(),
//     SEASON_START_DATES[season].month - 1,
//     SEASON_START_DATES[season].day
//   );
  
//   const diffTime = date.getTime() - startDate.getTime();
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays + 1; // Add 1 to make it 1-based
// };

// const formatPoints = (points: number): string => {
//   if (points >= 1000) {
//     return `${Math.round(points / 1000)}K`;
//   }
//   return Math.round(points).toString();
// };

// export const calculateDailyPoints = (date: Date = new Date()): string => {
//   const dayOfSeason = getDayOfSeason(date);

//   // First day of the season
//   if (dayOfSeason === 1) {
//     return '2';
//   }

//   // Second day of the season
//   if (dayOfSeason === 2) {
//     return '3';
//   }

//   // Calculate points for third day and beyond
//   let twoDaysAgo = 2; // Points from day 1
//   let oneDayAgo = 3;  // Points from day 2
//   let currentPoints = 0;

//   // Calculate points for each day up to the current day
//   for (let day = 3; day <= dayOfSeason; day++) {
//     currentPoints = twoDaysAgo + (oneDayAgo * 0.6);
//     twoDaysAgo = oneDayAgo;
//     oneDayAgo = currentPoints;
//   }

//   return formatPoints(currentPoints);
// };

// // For testing different dates
// export const calculatePointsForDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return calculateDailyPoints(date);
// }; 
// ====== CONFIGURATION ======
  
  // ====== CORE CALCULATION ======
 export function calculateDailyPoints(targetDate = new Date()) {
    // 1. Determine current season and day number
    const { season, dayOfSeason } = getSeasonAndDay(targetDate);
    
    // 2. Calculate points recursively
    const points = getPointsForDay(dayOfSeason);
    console.log(points);
    // 3. Format the result
    return formatPoints(points);
  }
  
  type Season = 'spring' | 'summer' | 'autumn' | 'winter';
  type SeasonInfo = {
    name: Season;
    start: [number, number]; // [month, day]
    end: [number, number];
  };
  
  // ====== SEASON DETECTION ======
  function getSeasonAndDay(date: Date): { season: Season; dayOfSeason: number } {
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1; // 1-12
    const day: number = date.getDate();
    const SEASONS: SeasonInfo[] = [
        { name: 'spring', start: [3, 1], end: [5, 31] },
        { name: 'summer', start: [6, 1], end: [8, 31] },
        { name: 'autumn', start: [9, 1], end: [11, 30] },
        { name: 'winter', start: [12, 1], end: [2, isLeapYear(year) ? 29 : 28] }
      ];
  
    // Type-safe season finder
    const season = SEASONS.find((s): boolean => {
      const [startMonth, startDay] = s.start;
      const [endMonth, endDay] = s.end;
      
      return (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (month > startMonth && month < endMonth)
      );
    }) || SEASONS[3]; // Fallback to winter
  
    // Type-safe date arithmetic
    let seasonStart: Date;
    if (season.name === 'winter' && month <= 2) {
      seasonStart = new Date(year - 1, 11, 1); // Previous year's Dec 1
    } else {
      seasonStart = new Date(year, season.start[0] - 1, season.start[1]);
    }
  
    // Type-safe day calculation
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
  
  function getPointsForDay(day: number) {
    if (day === 1) return 2;
    if (day === 2) return 3;
    // Memoization for performance
    if (!memo[day]) {
      memo[day] = Math.round(
        getPointsForDay(day - 2) + 0.6 * getPointsForDay(day - 1)
      );
    }
    return memo[day];
  }
  
  function formatPoints(points: number) {
    if (points >= 1000000000) return `${Math.round(points/1000000000)/10}B`;
    if (points >= 1000000) return `${Math.round(points/1000000)/10}M`;
    if (points >= 1000) return `${Math.round(points/100)/10}K`;

    return points.toString();
  }
  
  // ====== USAGE ======
  const memo: Record<number, number> = {}; // Cache for recursive calculations
  const today = new Date(2025, 4, 30); // May 30, 2025
  console.log(calculateDailyPoints(today)); // Output: "1.2M"