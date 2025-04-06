export default function ListItem(props){
    const {saint,feast,week_day} = props

    const feastsAndSaints = () =>{
        const saints = saint && saint.map(e=>(<><span>{`${e.name.slice(0, 20)}...`}</span></>))
        const feasts = feast && feast.map(e=>(<span>{`${e.name.slice(0, 20)}...`}</span>))
        return (
            <>
                <sub style={{color: "red", "font-style":"italic", "text-transform":"capitalize", "top":"-7em", position:"relative"}}>{week_day}</sub>
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