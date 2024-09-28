const createApiFeatures = (query, queryStr) => {
  const search = () => {
    const keyword = queryStr.keyword
      ? {
          name: {
            $regex: queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    query = query.find({ ...keyword });
    return { query, queryStr, search, filter, pagination };
  };

  const filter = () => {
    const queryCopy = { ...queryStr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    let queryStrModified = JSON.stringify(queryCopy);
    queryStrModified = queryStrModified.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    return { query, queryStr, search, filter, pagination };
  };

  const pagination = (resultPerPage) => {
    const currentPage = Number(queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    query = query.skip(skip).limit(resultPerPage);
    return { query, queryStr, search, filter, pagination };
  };

  return { query, queryStr, search, filter, pagination };
};

module.exports = createApiFeatures;
