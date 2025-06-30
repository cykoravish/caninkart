
const HeadingDropdown = ({ editor }) => {
  if (!editor) return null

  return (
    <select
      onChange={(e) => {
        const level = parseInt(e.target.value)
        if (level === 0) {
          editor.chain().focus().setParagraph().run()
        } else {
          editor.chain().focus().toggleHeading({ level }).run()
        }
      }}
    >
      <option value="0">Paragraph</option>
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="3">Heading 3</option>
    </select>
  )
}
 export default HeadingDropdown;