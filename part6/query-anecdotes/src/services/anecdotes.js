const baseURl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseURl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

export const createNewAnecdote = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  }

  const response = await fetch(baseURl, options)
  if (!response.ok) {
    throw new Error('failed to add new anecdote')
  }
  return response.json()
}

export const voteForAnaecdote = async (anecdote) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 }),
  };

  const response = await fetch(`${baseURl}/${anecdote.id}`, options);
  if (!response.ok) {
    throw new Error("Error updating anecdote");
  }

  return response.json();
};

