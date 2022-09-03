import { useRouter } from 'next/router'
import React from 'react'
import { trpc } from '../../utils/trpc'

const QuestionsPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    'questions.get-by-id',
    { id },
  ])

  if (!isLoading && !data) {
    return <div>Question not found!</div>
  }
  console.log('--data', data)
  return (
    <>
      <div className="mb-2 text-4xl text-blue-500">
        {data?.question?.question}
      </div>
      {data?.isOwner && (
        <div className="bg-red-300 rounded-md p-3">You are the owner!</div>
      )}
      <div>
        {(data?.question?.options as string[])?.map((option, i) => (
          <>
            <input type="radio" id={id + i} name="option" value="30" />
            &nbsp;
            <label>{option}</label>
            <br />
          </>
        ))}
      </div>
    </>
  )
}

const QuestionPage = () => {
  const { query } = useRouter()
  const { id } = query

  if (!id || typeof id !== 'string') {
    return <div>No ID</div>
  }

  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <QuestionsPageContent id={id} />
    </main>
  )
}

export default QuestionPage
