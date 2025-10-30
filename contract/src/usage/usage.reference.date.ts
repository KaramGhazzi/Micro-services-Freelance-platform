// eslint-disable-next-line class-methods-use-this
const resetDateToMidnight = (date: Date) => {
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

export const calculateWeeklyUsageReferenceData = (
  now: Date,
  subscriptionStartDate: Date
) => {
  const subscriptionWeekDay = subscriptionStartDate.getDay();
  const referenceWeekDay = now.getDay();

  let difference = subscriptionWeekDay - referenceWeekDay;
  if (difference > 0) {
    difference -= 7;
  }

  now.setDate(now.getDate() + difference);
  return resetDateToMidnight(now);
};

export const calculateMonthlyUsageReferenceDate = (
  now: Date,
  subscriptionStartDate: Date
) => {
  const subscriptionDayOfMonth = subscriptionStartDate.getDate();

  const lastMonth = new Date(now.getUTCFullYear(), now.getUTCMonth(), 0);
  const lastDayOfMonth = lastMonth.getDate();

  now.setMonth(now.getMonth() - 1);
  if (lastDayOfMonth < subscriptionDayOfMonth) {
    now.setDate(lastDayOfMonth);
  } else {
    now.setDate(subscriptionDayOfMonth);
  }

  return resetDateToMidnight(now);
};

export const calculateYearlyUsageReferenceDate = (
  now: Date,
  subscriptionStartDate: Date
) => {
  // Calculate this years reference date
  const referenceDateThisYear = new Date(subscriptionStartDate);
  referenceDateThisYear.setFullYear(now.getFullYear());

  // Check if reference date is in the future so we need to go back one year
  // Setting the full year will automatically jump to the 1st of march on non-leap years
  if (now < referenceDateThisYear) {
    const referenceDatePreviousYear = new Date(subscriptionStartDate);
    referenceDatePreviousYear.setFullYear(now.getFullYear() - 1);

    return resetDateToMidnight(referenceDatePreviousYear);
  }

  return resetDateToMidnight(referenceDateThisYear);
};
