import { stdin } from 'mock-stdin'

export function mockStdin (responses: string[]) {
  const mStdin = stdin()

  let k = 0

  function sendAnswer () {
    setTimeout(() => {
      const text = responses[k]
      mStdin.send(text)
      k += 1
      if (k < responses.length) {
        sendAnswer()
      }
    }, 0)
  }

  sendAnswer()
}

export const Keys = Object.freeze({
  UP: '\u001b[A',
  DOWN: '\u001b[B',
  LEFT: '\u001b[D',
  RIGHT: '\u001b[C',
  ENTER: '\n'
})
