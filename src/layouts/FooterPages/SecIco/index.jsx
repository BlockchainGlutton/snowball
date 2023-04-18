const SecIco = ({logo}) => {
	return(
        <div className="col-12 col-md-5">
          <div className="footer-copywrite-info">
            {/* Copywrite */}
            <div className="copywrite_text wow fadeInUp" data-wow-delay="0.2s">
              <div className="footer-logo">
                <a href="#"><img src={logo} alt="logo" /></a>
              </div>
              <p>That enables security, automates talent management, and optimizes growth for businesses in both reality and metaverse.</p>
            </div>
            {/* Social Icon */}
            <div className="footer-social-info wow fadeInUp" data-wow-delay="0.4s">
              <a href="https://t.me/AnonyDoxx"><i className="fa fa-telegram" aria-hidden="true" /></a>
              <a href="https://mobile.twitter.com/AnonyDoxx"> <i className="fa fa-twitter" aria-hidden="true" /></a>
              {/* <a href="#"><i className="fa fa-google-plus" aria-hidden="true" /></a>
              <a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a>
              <a href="#"><i className="fa fa-linkedin" aria-hidden="true" /></a> */}
            </div>
          </div>
        </div>
	)
}

export default SecIco