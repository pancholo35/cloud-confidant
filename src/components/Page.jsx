import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CreatePage } from '../services/PageServices'

const Page = ({ pages }) => {
  let { journal_id } = useParams()
  const initialState = {
    title: '',
    content: '',
    journalId: journal_id
  }
  let [formToggle, setFormToggle] = useState(false)
  let [formState, setFormState] = useState(initialState)
  let [pageNumber, setPageNumber] = useState(1)
  let ceilingReached = pages.length > 1 ? false : true
  let floorReached = true

  const incrementPage = () => {
    if (pageNumber + 1 === pages.length) {
      ceilingReached = true
    } else {
      ceilingReached = false
    }
    setPageNumber(pageNumber + 1)
  }

  const decrementPage = () => {
    if (pageNumber - 1 === 0) {
      floorReached = true
    } else {
      floorReached = false
    }
    setPageNumber(pageNumber - 1)
  }

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const page = await CreatePage(formState)
    pages.push(page)
    setFormToggle(false)
    setFormState(initialState)
  }

  return pages.length > 0 ? (
    <div>
      <h3>{pages[pageNumber - 1].title}</h3>
      <div>{pages[pageNumber - 1].content}</div>
      <div className="flex-row page-flip">
        <button type="button" disabled={floorReached} onClick={decrementPage}>
          Back
        </button>
        <p>{pageNumber}</p>
        <button type="button" disabled={ceilingReached} onClick={incrementPage}>
          Next
        </button>
      </div>
      {formToggle && (
        <form className="flex-col page-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formState.title}
            onChange={handleChange}
          />
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="4" />
        </form>
      )}
      <button
        type="button"
        onClick={() => setFormToggle((current) => !current)}
      >
        Write in your journal...
      </button>
    </div>
  ) : (
    <div className="flex-col page-content">
      No pages
      {formToggle && (
        <form className="flex-col page-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formState.title}
            onChange={handleChange}
          />
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="4" />
        </form>
      )}
      <button
        type="button"
        onClick={() => setFormToggle((current) => !current)}
      >
        Write in your journal...
      </button>
    </div>
  )
}

export default Page
