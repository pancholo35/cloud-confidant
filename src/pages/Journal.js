import Page from '../components/Page'
import { useEffect, useState } from 'react'
import { GetJournal } from '../services/JournalServices'
import { useParams } from 'react-router-dom'

const Journal = ({ user }) => {
  let { journal_id } = useParams()
  let [journal, setJournal] = useState()

  const handleJournal = async () => {
    let res = await GetJournal(journal_id)
    setJournal(res)
  }

  useEffect(() => {
    if (user) handleJournal()
  }, [user])

  return (
    <div className="flex-col">
      <h1>{journal && journal.title}</h1>
      {journal && <Page pages={journal.pages} />}
    </div>
  )
}

export default Journal
