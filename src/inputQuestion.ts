import inquirer from 'inquirer'

export const inputQuestion = async (message: string): Promise<string> => {
  const answer = await inquirer
    .prompt<Promise<{ input_question: string }>>([
      {
        type: 'input',
        name: 'input_question',
        message,
        validate: (input: string) => input.trim().length > 0 || 'Não pode ser vazio'
      }
    ])

  return answer.input_question
}
