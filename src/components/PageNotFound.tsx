import { Link } from "react-router-dom"


const PageNotFound = () => {

    return (<>

        <div className=" mt-5 container d-flex justify-content-center align-content-center" >
            <div className="row ">
                <div className="col-md-12">
                    <div className=" text-danger">
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <br />
                        <div >
                            <Link to={'/'} className="btn btn-primary btn-lg">Take Me Home </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>)

}

export default PageNotFound