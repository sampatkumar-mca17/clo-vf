import React from "react";
import "./Card.scss";
import SkeletonLoader from "../../reusable-components/Skeleton";
function Card({title, description, priceOption, image, style}: {title: string, description: string, priceOption: string | number, image: string, style?: React.CSSProperties}) {
    const [loading, setLoading] = React.useState(true);
    return (
        <div data-testid="card" className="card" style={style}>
            <div className="card-image">
                 {loading && <SkeletonLoader/>}
                <img loading="lazy" onLoad={()=> setLoading(false)}  data-testid="card-image" src={image} alt="card-image" />
            </div>
            <div className="card-content">  
                <div className="card-title-and-description">
                    <div className="card-title" data-testid="card-title">
                        <span data-testid="card-title-text">{title}</span>
                    </div>
                    <div className="card-description">
                        <span data-testid="card-description">{description}</span>
                    </div>
                </div>
                <div className="card-price">
                    <span data-testid="card-price">{priceOption}</span>
                </div>
            </div>
        </div>
    )
}
export default Card