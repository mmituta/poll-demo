/**
 * Removes an element from the array.
 * @param array that the element will be removed from.
 * @param element  to be removed.
 */
export function deleteFrom<TYPE>(array: TYPE[], element: TYPE): void {
  const index: number = array.indexOf(element, 0);
  if (index > -1) {
    array.splice(index, 1);
  }
}
