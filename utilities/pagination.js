module.exports = (request) => {
  const { query: { limit = '', page = '' } = {} } = request;

  const adjustedLimit = limit ? (Number(limit) || 20) : 20;
  const adjustedPage = page ? (Number(page) || 1) : 1;

  return {
    limit: adjustedLimit,
    offset: (adjustedPage - 1) * adjustedLimit,
    page: adjustedPage,
  };
};
