import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CreatePage, UpdatePage, DeletePage } from '../services/PageServices'

const Page = ({ pages }) => {
  let { journal_id } = useParams()
  const initialState = {
    title: '',
    content: '',
    journalId: journal_id
  }
  let [formToggle, setFormToggle] = useState(false)
  let [formState, setFormState] = useState(initialState)
  let [isEditing, setIsEditing] = useState(false)
  let [pageNumber, setPageNumber] = useState(1)
  let [ceilingReached, setCeilingReached] = useState(
    pages.length > 1 ? false : true
  )
  let [floorReached, setFloorReached] = useState(true)

  const incrementPage = () => {
    if (pageNumber + 1 === pages.length) {
      setCeilingReached(true)
    } else {
      setCeilingReached(false)
    }
    setPageNumber(pageNumber + 1)
    setFloorReached(false)
  }

  const decrementPage = () => {
    if (pageNumber - 1 === 1) {
      setFloorReached(true)
    } else {
      setFloorReached(false)
    }
    setPageNumber(pageNumber - 1)
    setCeilingReached(false)
  }

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isEditing) {
      pages[pageNumber - 1] = await UpdatePage(
        formState,
        pages[pageNumber - 1].id
      )
      setFormToggle(false)
      setFormState(initialState)
      setIsEditing(false)
    } else {
      const page = await CreatePage(formState)
      pages.push(page)
      incrementPage()
      setFormToggle(false)
      setFormState(initialState)
    }
  }

  const handleEdit = () => {
    if (formState.title && formState.content) {
      formState.title = ''
      formState.content = ''
    } else {
      formState.title = pages[pageNumber - 1].title
      formState.content = pages[pageNumber - 1].content
    }
    setIsEditing(true)
    setFormToggle((current) => !current)
  }

  const handleDelete = async () => {
    if (window.confirm('Delete this page?')) {
      await DeletePage(pages[pageNumber - 1].id)
      pages.splice(pageNumber - 1, 1)
      decrementPage()
      setCeilingReached(pageNumber !== pages.length)
    }
  }

  return pages.length > 0 ? (
    <div className="flex-col page-content">
      <div className="flex-row">
        <h3>{pages[pageNumber - 1].title}</h3>
        <button type="button" onClick={handleEdit}>
          Edit
        </button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
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
          <textarea
            id="content"
            name="content"
            rows="4"
            value={formState.content}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
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
          <textarea
            id="content"
            name="content"
            rows="4"
            value={formState.content}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
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
