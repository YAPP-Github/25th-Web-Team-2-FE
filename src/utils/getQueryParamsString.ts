export const getQueryParamsToString = (params: Record<string, unknown>) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Number.isInteger(value)) {
      queryParams.append(key, String(value));
    } else if (Array.isArray(value) && value.length > 0) {
      value.forEach((v) => {
        queryParams.append(key, String(v));
      });
    } else if (value !== undefined && value !== null && Object.keys(value).length > 0) {
      queryParams.append(key, String(value));
    }
  });

  return queryParams.toString();
};
