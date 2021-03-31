export const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id] = item.name
    return obj
  }, {})

export const deleteType = {
  DELETE_BOOKS: 1,
  ONLY_EMPTY_AUTHORS: 2
} 