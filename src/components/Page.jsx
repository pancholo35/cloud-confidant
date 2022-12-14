const Page = ({ page }) => {
  return (
    <div>
      <h3>{page.title}</h3>
      <div>{page.content}</div>
    </div>
  )
}

export default Page
