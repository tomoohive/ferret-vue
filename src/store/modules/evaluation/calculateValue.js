function calculateValue(value) {
  if (value >= 0 && value < 5000) return 1;
  if (value >= 5000 && value < 10000) return 2;
  if (value >= 10000 && value < 20000) return 3;
  if (value >= 20000 && value < 30000) return 4;
  if (value >= 30000 && value < 40000) return 5;
  if (value >= 40000 && value < 55000) return 6;
  if (value >= 55000 && value < 70000) return 7;
  if (value >= 70000 && value < 85000) return 8;
  if (value >= 85000 && value < 100000) return 9;
  return 10;
}

export default calculateValue;
