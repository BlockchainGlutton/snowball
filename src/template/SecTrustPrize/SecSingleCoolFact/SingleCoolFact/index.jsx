const SingleCoolFact = ({img , ico_check, url}) => {

  console.log(url)
  return (
    <div className="col-12 col-sm-4 col-md-4 col-lg-4" data-aos="fade-up">
      <a href={url} target="_blank">
        <div className="trust-item text-center">
            <div className="ico-platform-logo">
                <img src={img} alt="" style={{ height: 75 }} />
            </div>
            <div className="check">
              {ico_check}
            	{/* {ico_check ? (<div className="check-icon"></div>) : (<div className="value">8.9</div>)} */}
            </div>
        </div>
      </a>
    </div>
  );
}

export default SingleCoolFact;