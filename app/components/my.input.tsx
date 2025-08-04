
type Props = {
    title: string
    change: (value: string) => void
    className?: string
    type?: string
}

export default function MyInput({ title, change, className, type }: Props) {
    return (
        <div className={"div-input " + (className || "")}>
            <span className="mr-5">{title}:</span>
            <input className="my-input" type={type || 'text'} onChange={event => change(event.target.value)} />
        </div>
    )
}