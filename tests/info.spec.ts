import inquirer from 'inquirer'
import { info } from '@/info'

const mockedPrompt = jest.spyOn(inquirer, 'prompt')

describe('info', () => {
  beforeEach(() => {
    mockedPrompt.mockReset()
  })

  it('should info return true', async () => {
    mockedPrompt.mockResolvedValue({ info: true })

    await expect(info('Isso é uma Informação!')).resolves.toBeTruthy()
    expect(mockedPrompt).toHaveBeenCalledTimes(1)
  })

  it('should info return false', async () => {
    mockedPrompt.mockResolvedValue({ info: false })

    await expect(info('Isso é uma Informação!')).resolves.toBeFalsy()
    expect(mockedPrompt).toHaveBeenCalledTimes(1)
  })

  it('should info throw error', async () => {
    mockedPrompt.mockRejectedValue(new Error('Erro do sistema'))

    await expect(info('Isso é uma Informação!')).rejects.toThrow('Erro do sistema')
    expect(mockedPrompt).toHaveBeenCalledTimes(1)
  })
})
