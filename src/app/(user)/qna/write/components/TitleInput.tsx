interface TitleInputProps {
  title: string
  setTitle: (title: string) => void
}

export default function TitleInput({ title, setTitle }: TitleInputProps) {
  return (
    <div>
      <label htmlFor="title-input" className="w-30">
        제목
        <input
          id="title-input"
          type="text"
          className="ml-20 w-[267px] border-[#D5D1D1] border border-solid rounded-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
    </div>
  )
}
