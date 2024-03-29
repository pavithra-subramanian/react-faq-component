import './styles.css'
import data from './data'
import { useState, useEffect} from "react"
import star from '../../assets/images/icon-star.svg'
import plus from '../../assets/images/icon-plus.svg'
import minus from '../../assets/images/icon-minus.svg'


export default function Landing (){
    const [selected, setSelected] = useState("");
    const[icons, setIcons] = useState({});
    const handleSingleSelection = (getCurrentId) => {
        setSelected(prevState => ({
            ...prevState,
            [getCurrentId]: !prevState[getCurrentId]
        }));

        setIcons(prevIcons => ({
            ...prevIcons,
            [getCurrentId]: prevIcons[getCurrentId] === plus ? minus : plus
        }));
    }


    useEffect(() => {

        if (Object.keys(selected).length === 0) {
            const initialIcons = {};
            data.forEach(dataItem => {
                initialIcons[dataItem.id] = plus;
            });
            setIcons(initialIcons);
        }
    }, []);
        
    
    return (
        <div className='wrapper'>
            <div className='main'>
                <div className='card'>
                    <div className='card__headdiv'>
                        <img src={star} className='card__heading'style={{width: '30px'}} />
                        <h1 className='card__headtitle'>FAQs</h1>
                    </div>
                { data && data.length > 0 ? (

                    data.map ( (dataItem, index) => (
                    <div className="card__item">
                        <div 
                            onClick={() => handleSingleSelection(dataItem.id)} 
                            className="card__questiondiv">

                            <h3 className='card__questiontxt'>{dataItem.question}</h3>
                            <div className='flexend'><img src={icons[dataItem.id]} className="card__selectionicon"/></div>
                        </div>
                        {
                            selected[dataItem.id ] &&
                            <div className="card__contenttxt">{dataItem.answer}</div>    
                        }
                        {index !== data.length - 1 && <div className='center'><div className='card__border'></div></div>}
                    </div>
                    ))                   
           ) : (
           <div>No data found</div>
           )}
                </div>
            </div>
        </div>
    )
}