import inquirer from 'inquirer'
import { alert } from '@/alert'

const mockedPrompt = jest.spyOn(inquirer, 'prompt')

describe('alert', () => {
  beforeEach(() => {
    mockedPrompt.mockReset()
  })

  it('should alert not return', async () => {
    mockedPrompt.mockResolvedValue({ alert: 'OK' })

    await expect(alert('Isso é um Alerta!')).resolves.toBeUndefined()
    expect(mockedPrompt).toHaveBeenCalledTimes(1)
  })

  it('should alert throw error', async () => {
    mockedPrompt.mockRejectedValue(new Error('Erro do sistema'))

    await expect(alert('Isso é um Alerta!')).rejects.toThrow('Erro do sistema')
    expect(mockedPrompt).toHaveBeenCalledTimes(1)
  })
})
