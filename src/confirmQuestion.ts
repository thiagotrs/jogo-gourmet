import inquirer from 'inquirer'

export const confirmQuestion = async (message: string): Promise<boolean> => {
  const answer = await inquirer
    .prompt<Promise<{ confirm_question: boolean }>>([
      {
        type: 'list',
        name: 'confirm_question',
        message,
        choices: [
          'Sim',
          'Não'
        ],
        filter: res => res === 'Sim'
      }
    ])

  return answer.confirm_question
}
