import banner from '../assets/banner.png'

const Hero = () => {
    return (
        <section className="hero d-flex align-items-center">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                        <div className='d-flex flex-column align-items-center d-md-block'>
                            <div className="fs-4 fw-medium mb-2 text-center text-md-start">
                                Sách của bạn
                            </div>
                            <div className="fs-1 mb-2 fw-semibold text-center text-md-start">
                                Tận hưởng những quyển book của bạn
                            </div>
                            <div className="fs-6 mb-3">
                                Khám phá ngay
                            </div>
                            <div>
                                <button className="btn btn-primary btn-lg fw-medium">Explore now</button>
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-md-block col-md-6">
                        <img className='banner' src={banner} alt="banner" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero