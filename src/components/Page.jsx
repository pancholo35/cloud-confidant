import { useState } from 'react'

const Page = ({ pages }) => {
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

  return (
    <div>
      <h3>{pages[pageNumber - 1].title}</h3>
      <div>{pages[pageNumber - 1].content}</div>
      <button type="button" disabled={floorReached} onClick={decrementPage}>
        Back
      </button>
      <button type="button" disabled={ceilingReached} onClick={incrementPage}>
        Next
      </button>
    </div>
  )
}

export default Page
