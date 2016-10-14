class Render {
  constructor (kwargs) {
    for (let k in kwargs) {
      this[k] = kwargs[k]
    }
  }

}
