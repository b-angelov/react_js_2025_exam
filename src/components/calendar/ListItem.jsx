export default function ListItem(props){
    const {saint,feast,week_day} = props

    const feastsAndSaints = () =>{
        const saints = saint && saint.map((e,i)=>(<span key={i}>{`${e.name.slice(0, 20)}...`}</span>))
        const feasts = feast && feast.map((e,i)=>(<span key={i}>{`${e.name.slice(0, 20)}...`}</span>))
        return (
            <>
                <sub style={{color: "red", "fontStyle":"italic", "textTransform":"capitalize"}}>{week_day}</sub>
                {saints}
                {feasts}
            </>
        )
    }

    let date = new Date(props.date)
    return (
        <li><time dateTime={date} className={"today"}>{date.getDate() || ""}</time>{feastsAndSaints()}</li>
    )
}