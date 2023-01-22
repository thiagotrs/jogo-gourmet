import inquirer from 'inquirer'
import { inputQuestion } from '@/inputQuestion'

const mockedPrompt = jest.spyOn(inquirer, 'prompt')

describe('inputQuestion', () => {
  beforeEach(() => {
    mockedPrompt.mockReset()
  })

  it('should question return input', async () => {
    const resp = 'Bife Grelhado'
    mockedPrompt.mockResolvedValue({ input_question: resp })

    await expect(inputQuestion('Que prato é esse?')).resolves.toBe(resp)
    expect(mockedPrompt).toHaveBeenCalledTimes(1)
  })

  it('should inputQuestion throw error', async () => {
    mockedPrompt.mockRejectedValue(new Error('Erro do sistema'))

    await expect(inputQuestion('Que prato é esse?')).rejects.toThrow('Erro do sistema')
    expect(mockedPrompt).toHaveBeenCalledTimes(1)
  })
})
