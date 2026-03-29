"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT QUERY HANDLER                */
/* -------------------------------------------------------------------------- */

module.exports = async (req, res, next) => {
  //Filtering
  const filter = req.query.filter || {};

  //Searching
  const search = req.query.search || {};

  for (let key in search) search[key] = { $regex: search[key], $options: "i" };

  //SORTING
  const sort = req.query.sort || {};

  //Pagination

  let page = parseInt(req.query.page);
  page = page > 0 ? page : 1;

  let limit = parseInt(req.query.limit);
  limit = limit > 0 ? limit : 20;

  let skip = parseInt(req.query?.skip);

  skip = skip > 0 ? skip : limit * (page - 1);

  
  //GETMODELLIST DETAILS 
  res.getModelList = async (Model, populate = null) => {
    return await Model.find({ ...filter, ...search })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };

  //GETMODELLIST DETAILS 
  res.getModelListDetails = async (Model) => {
    const count = await Model.countDocuments({ ...search, ...filter });
    return  {
      filter,
      search,
      sort,
      skip,
      limit,
      page,
      totalRecords: count,
      pages:
        count <= limit // if total returned elements count less than limit
          ? false // there is no page or alternative page 1
          : {
              //if total returned elements count more than limit
              previous: page > 1 ? page - 1 : false, //if page is bigger than 1 previous is page -1 if not previous is false
              current: page,
              next: page < Math.ceil(count / limit) ? page + 1 : false, //if total number of pages(count/limit) bigger than page next is page+1 if not false
              total:Math.ceil(count/limit)      
            },
    };
  };

  next();
};
