import { useParams } from 'react-router-dom';


function BoardPage() {
    
    const title = useParams()

    // useEffect(() => {
        
    // }, [])

    return (
        <div style={{color: "black", fontFamily: "Lausanne"}}>
            <h1>{title.title}</h1> 

        </div>
    )
}

export default BoardPage;