import { useState } from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
    const [state, setState] = useState()
    const changeValue = (e) => {
        setState(e.target.value)
    }
    return (
        <nav className="navbar navbar-expand-lg bg-dark fixed-top">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link className="navbar-brand text-white" to="/"> <img src="" alt="" /> </Link>
                        <Link className="navbar-brand text-white" to="/">Home Page</Link>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={state} onChange={changeValue} />
                        <Link to={`/search/${state}`}>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}
export default NavBar