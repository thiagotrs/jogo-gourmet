import { alert } from '@/alert'
import { Keys, mockStdin } from './helpers/mockStdIn'
import { stdout } from 'stdout-stderr'

describe('alert', () => {
  beforeEach(() => {
    stdout.start()
  })

  it('should alert not return when selected "OK"', async () => {
    expect.assertions(2)

    mockStdin([Keys.ENTER])
    const answer = await alert('Isso é um Alerta!')
    stdout.stop()

    expect(answer).toBeUndefined()
    expect(stdout.output).toBe(
      '! Isso é um Alerta! (Use arrow keys)\n❯ OK ! Isso é um Alerta! OK\n'
    )
  })

  it('should alert ignore invalid input', async () => {
    expect.assertions(2)

    mockStdin([Keys.LEFT, Keys.ENTER])
    const answer = await alert('Isso é um Alerta!')
    stdout.stop()

    expect(answer).toBeUndefined()
    expect(stdout.output).toBe(
      '! Isso é um Alerta! (Use arrow keys)\n❯ OK ! Isso é um Alerta! OK\n'
    )
  })
})
