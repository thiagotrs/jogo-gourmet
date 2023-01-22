import { info } from '@/info'
import { Keys, mockStdin } from './helpers/mockStdIn'
import { stdout } from 'stdout-stderr'

describe('info', () => {
  beforeEach(() => {
    stdout.start()
  })

  it('should info return true when selected "OK"', async () => {
    expect.assertions(2)

    mockStdin([Keys.ENTER])
    const answer = await info('Isso é uma Informação!')
    stdout.stop()

    expect(answer).toBeTruthy()
    expect(stdout.output).toMatch(
      '! Isso é uma Informação! (Use arrow keys)\n❯ OK \n  Fechar ! Isso é uma Informação! OK'
    )
  })

  it('should info return false when selected "Fechar"', async () => {
    expect.assertions(2)

    mockStdin([Keys.DOWN, Keys.ENTER])
    const answer = await info('Isso é uma Informação!')
    stdout.stop()

    expect(answer).toBeFalsy()
    expect(stdout.output).toMatch(
      '! Isso é uma Informação! (Use arrow keys)\n❯ OK \n  Fechar ! Isso é uma Informação! \n  OK \n❯ Fechar ! Isso é uma Informação! Fechar\n'
    )
  })

  it('should info ignore invalid input', async () => {
    expect.assertions(2)

    mockStdin([Keys.LEFT, Keys.ENTER])
    const answer = await info('Isso é uma Informação!')
    stdout.stop()

    expect(answer).toBeTruthy()
    expect(stdout.output).toMatch(
      '! Isso é uma Informação! (Use arrow keys)\n❯ OK \n  Fechar ! Isso é uma Informação! OK'
    )
  })
})
