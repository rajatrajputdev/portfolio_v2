import portfolioData from './portfolio.json';

export const getPortfolioData = () => {
  return portfolioData;
};

export const getSectionData = (section) => {
  return portfolioData[section] || null;
};

export const getThemeColors = () => {
  return portfolioData.theme.colors;
};

export default portfolioData;
