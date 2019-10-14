export const sliceArrOfObj = (arr, toCompare) => {
  let index = arr.findIndex(elem => elem.id === toCompare)
  arr.splice(index, 1)
}

export const sliceArrById = (arr, toCompareId) => {
  let i = arr.indexOf(toCompareId)
  arr.splice(i, 1)
}
