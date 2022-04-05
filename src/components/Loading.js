import loadingImg from '../img/Dual_Ball.gif'

import './Loading.css'

export default function Loading() {
    return (
        <div className="loading__fr">
            <img src={loadingImg} alt="" className="loading__img" />
        </div>
    )
}
