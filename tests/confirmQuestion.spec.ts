import inquirer from 'inquirer'
import { confirmQuestion } from '@/confirmQuestion'

const mockedPrompt = jest.spyOn(inquirer, 'prompt')

describe('confirmQuestion', () => {
  beforeEach(() => {
    mockedPrompt.mockReset()
  })

  it('should question return true', async () => {
    mockedPrompt.mockResolvedValue({ confirm_question: true })

    await expect(confirmQuestion('Isso é uma Questão?')).resolves.toBeTruthy()
    expect(mockedPrompt).toHaveBeenCalledTimes(1)
  })

  it('should question return false', async () => {
    mockedPrompt.mockResolvedValue({ confirm_question: false })

    await expect(confirmQuestion('Isso é uma Questão?')).resolves.toBeFalsy()
    expect(mockedPrompt).toHaveBeenCalledTimes(1)
  })

  it('should question throw error', async () => {
    mockedPrompt.mockRejectedValue(new Error('Erro do sistema'))

    await expect(confirmQuestion('Isso é uma Questão?')).rejects.toThrow('Erro do sistema')
    expect(mockedPrompt).toHaveBeenCalledTimes(1)
  })
})
