const periods = ['today', 'week', 'month'] as const;
type Period = typeof periods[number];

export { periods, Period };
