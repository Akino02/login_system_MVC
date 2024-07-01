import { Link } from "react-router-dom"

export default function CatLink(props) {
   
    return (
        <>
            <Link to={`/cat/${props._id}`}>
                <p>{props.name}</p>
            </Link>
        </>
    )
}