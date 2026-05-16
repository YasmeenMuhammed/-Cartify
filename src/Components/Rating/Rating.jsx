import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Fragment } from 'react';



export default function Rating({ rating }) {

    function getStarIcon(position) {

        if (rating >= position) {
            return <FaStar />;
        }

        else if (rating >= position - 0.5) {
            return <FaStarHalfAlt />;
        }

        else {
            return <FaRegStar />;
        }
    }

    return <>
        <div className="stars flex gap-2 text-xl text-yellow-300">
            {
                [1, 2, 3, 4, 5].map((position, index) => <Fragment key={index} >
                    {getStarIcon(position)}
                </Fragment>)
            }
        </div>
    </>
}
