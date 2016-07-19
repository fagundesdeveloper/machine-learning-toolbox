export function information () {
  const request = axios.get('${ROOT_URL}/ingredient')

  return {
    type: FETCH_INGREDIENT,
    payload: request

  }
}
