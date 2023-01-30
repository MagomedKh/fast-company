export function paginate(items, pageNumber, pageSize) {
   const startIndex = (pageNumber - 1) * 4;
   return [...items].splice(startIndex, pageSize);
};