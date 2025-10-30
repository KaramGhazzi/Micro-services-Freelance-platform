import {
  calculateMonthlyUsageReferenceDate,
  calculateWeeklyUsageReferenceData,
  calculateYearlyUsageReferenceDate,
} from './usage.reference.date';

describe('UsageReferenceDate', () => {
  const setExpectedDate = (date: string) => {
    const expectedDate = new Date(date);
    expectedDate.setUTCHours(0, 0, 0, 0);
    return expectedDate;
  };

  it('weekly - should return the same weekday as the subscription start weekday: numeric weekday > current numeric weekday', async () => {
    const currentWeekDate = calculateWeeklyUsageReferenceData(
      new Date('2023-02-06'),
      new Date('2023-01-28')
    );
    expect(currentWeekDate).toStrictEqual(setExpectedDate('2023-02-04'));
  });

  it('weekly - should return the same weekday as the subscription start weekday: numeric weekday < current numeric weekday', async () => {
    const currentWeekDate = calculateWeeklyUsageReferenceData(
      new Date('2023-01-13'),
      new Date('2023-01-03')
    );
    expect(currentWeekDate).toStrictEqual(setExpectedDate('2023-01-10'));
  });

  it('monthly - should return the same day as the subscription start month day < 28', async () => {
    const currentMonthDate = calculateMonthlyUsageReferenceDate(
      new Date('2023-03-06'),
      new Date('2023-01-28')
    );
    expect(currentMonthDate).toStrictEqual(setExpectedDate('2023-02-28'));
  });

  it('monthly - should return the maximum month day as the subscription start month day = 31', async () => {
    const currentMonthDate = calculateMonthlyUsageReferenceDate(
      new Date('2023-03-06'),
      new Date('2023-01-31')
    );
    expect(currentMonthDate).toStrictEqual(setExpectedDate('2023-02-28'));
  });

  it('yearly - should return reference date with current year', async () => {
    const currentYearDate = calculateYearlyUsageReferenceDate(
      new Date('2023-03-06'),
      new Date('2023-02-28')
    );
    expect(currentYearDate).toStrictEqual(setExpectedDate('2023-02-28'));
  });

  it('yearly - should return reference date with previous year if not been a year yet ', async () => {
    const currentYearDate = calculateYearlyUsageReferenceDate(
      new Date('2023-02-06'),
      new Date('2023-02-28')
    );
    expect(currentYearDate).toStrictEqual(setExpectedDate('2022-02-28'));
  });

  it('yearly - should return 1th of march if leap date and 1 year has passed', async () => {
    const currentYearDate = calculateYearlyUsageReferenceDate(
      new Date('2025-04-01'),
      new Date('2024-02-29')
    );
    expect(currentYearDate).toStrictEqual(setExpectedDate('2025-03-01'));
  });

  it('yearly - should return 1th of march if leap date and 1 year has passed but after new year', async () => {
    const currentYearDate = calculateYearlyUsageReferenceDate(
      new Date('2026-02-02'),
      new Date('2024-02-29')
    );
    expect(currentYearDate).toStrictEqual(setExpectedDate('2025-03-01'));
  });

  it('yearly - should return leap day if year has not yet passed', async () => {
    const currentYearDate = calculateYearlyUsageReferenceDate(
      new Date('2024-03-02'),
      new Date('2024-02-29')
    );
    expect(currentYearDate).toStrictEqual(setExpectedDate('2024-02-29'));
  });

  it('yearly - should return leap day if year has not yet passed but after new year', async () => {
    const currentYearDate = calculateYearlyUsageReferenceDate(
      new Date('2025-01-02'),
      new Date('2024-02-29')
    );
    expect(currentYearDate).toStrictEqual(setExpectedDate('2024-02-29'));
  });
});
