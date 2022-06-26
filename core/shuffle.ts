export default function shuffle(array: any[]) {
    let i = array.length
    let random: number = 0
    while (i != 0) {
      random = Math.floor(Math.random() * i)
      i--
      [array[i], array[random]] = [array[random], array[i]]
    }
    return array
}