import "./Card.scss";
function Card({title, description, priceOption, image, style}: {title: string, description: string, priceOption: string | number, image: string, style?: React.CSSProperties}) {
    return (
        <div className="card" style={style}>
            <div className="card-image">
                <img src={image} alt="card-image" />
            </div>
            <div className="card-content">  
                <div className="card-title-and-description">
                    <div className="card-title">
                        <span>{title}</span>
                    </div>
                    <div className="card-description">
                        <span>{description}</span>
                    </div>
                </div>
                <div className="card-price">
                    <span>{priceOption}</span>
                </div>
            </div>
        </div>
    )
}
export default Card